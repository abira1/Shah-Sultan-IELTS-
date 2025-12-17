import React from 'react';
import Button from '../../components/ui/Button';
interface ReadingProps {
  onComplete: () => void;
}
const Reading: React.FC<ReadingProps> = ({
  onComplete
}) => {
  return <div className="container max-w-3xl mx-auto py-16">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Reading Test
        </h1>
        <div className="mb-8">
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mb-6">
            <p className="text-text-secondary">
              This is a placeholder for the Reading test component. In the
              actual test, you would read passages and answer comprehension
              questions.
            </p>
          </div>
          <div className="text-center mt-8">
            <Button variant="primary" onClick={onComplete}>
              Complete Reading Section
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default Reading;