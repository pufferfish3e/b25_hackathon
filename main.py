import numpy as np
import tensorflow as tf
# Load the model
model = tf.keras.models.load_model("model.keras")
data_dir = "data/dataset/train"
batch_size = 32
train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,
    subset="training",
    seed=1234,
    image_size=(300, 300),
    batch_size=batch_size
)
data_dir = "data/dataset/test" 
batch_size = 32
test_ds = tf.keras.preprocessing.image_dataset_from_directory(
    data_dir,
    seed=1234,
    image_size=(300, 300),
    batch_size=batch_size
)

def check_class_distribution(dataset, class_names):
    """Check if your dataset is severely imbalanced"""
    class_counts = {}
    
    for images, labels in dataset:
        for label in labels:
            label_val = label.numpy()
            class_counts[label_val] = class_counts.get(label_val, 0) + 1
    
    total = sum(class_counts.values())
    
    print("\n=== CLASS DISTRIBUTION ===")
    for class_idx in sorted(class_counts.keys()):
        count = class_counts[class_idx]
        percentage = (count / total) * 100
        print(f"'{class_names[class_idx]}': {count} samples ({percentage:.1f}%)")
        
        if percentage > 50:
            print(f"🚨 '{class_names[class_idx]}' dominates with {percentage:.1f}%!")
    
    return class_counts

def analyze_predictions(model, dataset, class_names):
    """Analyze what your model is actually predicting"""
    all_predictions = []
    all_true_labels = []
    
    print("Analyzing predictions...")
    for images, labels in dataset.take(10):  # Take several batches
        predictions = model.predict(images, verbose=0)
        predicted_classes = np.argmax(predictions, axis=1)
        
        all_predictions.extend(predicted_classes)
        all_true_labels.extend(labels.numpy())
    
    # Count predictions
    unique_preds, pred_counts = np.unique(all_predictions, return_counts=True)
    
    print("\n=== PREDICTION ANALYSIS ===")
    for class_idx, count in zip(unique_preds, pred_counts):
        percentage = (count / len(all_predictions)) * 100
        print(f"Predicted '{class_names[class_idx]}': {count} times ({percentage:.1f}%)")
    
    if len(unique_preds) == 1:
        print("🚨 PROBLEM: Model only predicts ONE class!")
    
    return all_predictions, all_true_labels

# Run analysis
print("Checking class distribution in training data:")
train_counts = check_class_distribution(train_ds, train_ds.class_names)

print("\nChecking class distribution in test data:")
test_counts = check_class_distribution(test_ds, train_ds.class_names)

print("\nAnalyzing model predictions:")
predictions, true_labels = analyze_predictions(model, test_ds, train_ds.class_names)

# Check if we need class balancing
max_class_percentage = max(count/sum(train_counts.values())*100 for count in train_counts.values())
if max_class_percentage > 50:
    print(f"\n⚠️ Dataset is imbalanced! Dominant class has {max_class_percentage:.1f}% of data")
    print("Consider using class weights or data augmentation to balance the classes.")

# Test individual predictions to verify model is working
def test_individual_predictions(model, dataset, class_names, num_samples=5):
    """Test a few individual predictions to see model behavior"""
    print(f"\n=== TESTING {num_samples} INDIVIDUAL PREDICTIONS ===")
    
    sample_count = 0
    for images, labels in dataset.take(1):
        for i in range(min(num_samples, len(images))):
            image = tf.expand_dims(images[i], 0)  # Add batch dimension
            prediction = model.predict(image, verbose=0)
            predicted_class = np.argmax(prediction[0])
            confidence = np.max(prediction[0])
            true_class = labels[i].numpy()
            
            print(f"Sample {i+1}:")
            print(f"  True class: {class_names[true_class]}")
            print(f"  Predicted: {class_names[predicted_class]} (confidence: {confidence:.3f})")
            print(f"  Correct: {'✅' if predicted_class == true_class else '❌'}")
            
            # Show top 3 predictions
            top_3_indices = np.argsort(prediction[0])[-3:][::-1]
            print(f"  Top 3 predictions:")
            for j, idx in enumerate(top_3_indices):
                print(f"    {j+1}. {class_names[idx]}: {prediction[0][idx]:.3f}")
            print()
            
            sample_count += 1
            if sample_count >= num_samples:
                break
        if sample_count >= num_samples:
            break

test_individual_predictions(model, test_ds, train_ds.class_names)