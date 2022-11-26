import { AnimatePresence, motion } from 'framer-motion';

import { slugify } from '../../Utils/helpers';

interface FormElementErrorProps {
  error?: string;
}

const FormElementError = ({ error: errorProp }: FormElementErrorProps) => {
  return (
    <AnimatePresence>
      <motion.div className="relative mt-1.5 -mb-2 overflow-hidden text-sm">
        {[errorProp].map((error) => (
          <motion.div
            key={slugify(error ?? '')}
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            exit={{ y: -12 }}
            className="text-red-500"
          >
            {error}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default FormElementError;