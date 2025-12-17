import React from 'react';
import { Video } from 'lucide-react';
import Button from '../../components/ui/Button';
interface SpeakingProps {
  onComplete: () => void;
}
const Speaking: React.FC<SpeakingProps> = ({
  onComplete
}) => {
  return <div className="container max-w-3xl mx-auto py-16">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Speaking Test
        </h1>
        <div className="mb-8">
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mb-6">
            <p className="text-text-secondary">
              Your speaking test will be conducted via Google Meet with an
              examiner. The test will take approximately 11-14 minutes and
              consists of three parts.
            </p>
          </div>
          <div className="bg-secondary p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Speaking Test Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-text-tertiary mb-1">Examiner</p>
                <p className="font-semibold">Sarah Johnson</p>
              </div>
              <div>
                <p className="text-sm text-text-tertiary mb-1">
                  Scheduled Time
                </p>
                <p className="font-semibold">1:30 PM (in 5 minutes)</p>
              </div>
              <div>
                <p className="text-sm text-text-tertiary mb-1">Duration</p>
                <p className="font-semibold">11-14 minutes</p>
              </div>
              <div>
                <p className="text-sm text-text-tertiary mb-1">Platform</p>
                <p className="font-semibold">Google Meet</p>
              </div>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-4">Speaking Test Format</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-secondary p-4 rounded-lg">
              <h3 className="font-semibold mb-2">
                Part 1: Introduction and Interview (4-5 minutes)
              </h3>
              <p className="text-text-secondary">
                The examiner will introduce themselves and ask you to confirm
                your identity. They will then ask general questions about
                familiar topics such as your home, family, work, studies, and
                interests.
              </p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <h3 className="font-semibold mb-2">
                Part 2: Individual Long Turn (3-4 minutes)
              </h3>
              <p className="text-text-secondary">
                You will be given a card with a topic and some prompts. You will
                have one minute to prepare, and then you will need to speak
                about the topic for 1-2 minutes. The examiner will then ask one
                or two questions about the topic.
              </p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <h3 className="font-semibold mb-2">
                Part 3: Two-Way Discussion (4-5 minutes)
              </h3>
              <p className="text-text-secondary">
                The examiner will ask further questions related to the topic in
                Part 2. These questions will require you to discuss more
                abstract ideas and concepts.
              </p>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-4">Technical Requirements</h2>
          <ul className="space-y-2 mb-8">
            <li className="flex items-start">
              <span className="text-accent mr-2">✓</span>
              <span className="text-text-secondary">
                Ensure your camera and microphone are working properly
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">✓</span>
              <span className="text-text-secondary">
                Find a quiet location with good lighting
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">✓</span>
              <span className="text-text-secondary">
                Test your internet connection
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">✓</span>
              <span className="text-text-secondary">
                Have your ID ready for verification
              </span>
            </li>
          </ul>
          <div className="bg-accent/10 p-6 rounded-lg mb-8 text-center">
            <h2 className="text-xl font-semibold text-accent mb-4">
              Join Your Speaking Test
            </h2>
            <p className="mb-4 text-text-secondary">
              Your examiner, Sarah Johnson, is waiting for you in the Google
              Meet room. Click the button below to join the meeting.
            </p>
            <Button variant="primary" href="https://meet.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <Video className="h-5 w-5 mr-2" />
              Join Google Meet
            </Button>
          </div>
          <div className="text-center">
            <p className="mb-4 text-text-secondary">
              After completing your speaking test, click the button below to
              finish the entire IELTS mock test.
            </p>
            <Button variant="secondary" onClick={onComplete}>
              Complete Mock Test
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default Speaking;