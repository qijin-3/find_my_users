import fs from 'fs';
import path from 'path';
import ResourceList from '@/components/ResourceList'


export const metadata = {
  title: 'Site',
  description: 'Explore our curated list of sites for web development, GitHub, and more.',
}


export default function Site() {
  const resourcesPath = path.join(process.cwd(), 'data', 'json', 'resources.json');
  const resources = JSON.parse(fs.readFileSync(resourcesPath, 'utf8'));

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Site</h1>
      <ResourceList resources={resources} showMoreLink={false} />
    </div>
  )
}