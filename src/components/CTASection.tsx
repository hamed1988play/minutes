import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface CTASectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonTo?: string;
}

export default function CTASection({ title, subtitle, buttonText, buttonTo = '/contact' }: CTASectionProps) {
  return (
    <section className="section bg-sand-100/50 dark:bg-ink-900/50">
      <div className="container-md text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-title"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-ink-500 dark:text-sand-500"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <Link to={buttonTo} className="btn btn-lg btn-primary">
            {buttonText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
