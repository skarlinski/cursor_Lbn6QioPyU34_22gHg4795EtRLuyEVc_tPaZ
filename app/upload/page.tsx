import { Suspense } from 'react';
import UploadForm from './form';

export default function UploadPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UploadForm />
    </Suspense>
  );
}
