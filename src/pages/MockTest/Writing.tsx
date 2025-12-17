import React from 'react';
import Button from '../../components/ui/Button';
interface WritingProps {
  onComplete: () => void;
}
const Writing: React.FC<WritingProps> = ({
  onComplete
}) => {
  return <div className="container max-w-3xl mx-auto py-16">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Writing Test
        </h1>
        <div className="mb-8">
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mb-6">
            <p className="text-text-secondary">
              This is a placeholder for the Writing test component. In the
              actual test, you would complete two writing tasks.
            </p>
          </div>
          <div className="text-center mt-8">
            <Button variant="primary" onClick={onComplete}>
              Complete Writing Section
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default Writing;