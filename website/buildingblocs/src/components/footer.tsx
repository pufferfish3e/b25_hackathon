import {motion} from 'framer-motion';

export interface FooterProps {
    backgroundColor: string;
    textColor: string;
}
export default function Footer({backgroundColor,textColor}: FooterProps) {
    return (
    <footer className={`bg-${backgroundColor} text-center py-8 flex flex-col items-center justify-center gap-4 pb-6`}>
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-hack text-${textColor} text-lg font-sf-pro mb-4`}
        >
            Made with ❤️ by Kendrick, Wei Chong, Tony and Mahek
        </motion.p>
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`font-hack text-${textColor} text-lg font-sf-pro`}
        >
            &copy; {new Date().getFullYear()} Percepta. All rights reserved.
        </motion.p>
    </footer>
    );
}