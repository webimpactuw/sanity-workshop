import { client } from '@/sanity/lib/client';
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image';

export default async function Home() {
  async function getDogs() {
    const query = "*[_type == 'dog']";
    const results = await client.fetch(query);
    console.log(results);

    return results;
  }

  const dogs = await getDogs();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl">Our dogs:</h1>

      {dogs.map((dog) => (
        <div key={dog._id} className="flex flex-col items-center justify-center bg-cyan-600 mb-10 p-6 rounded-md">
          <div className='relative w-52 h-52 mb-10'>
            <Image src={urlForImage(dog.image)} alt={dog.name} fill className='rounded-md'/>
          </div>
        
          <h2>🐶{dog.name}</h2>
          <p>🔢{dog.age} years old</p>
          <p>🌐{dog.breed}</p>
        </div>
      ))}
    </main>
  )
}
