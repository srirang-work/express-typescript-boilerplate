import Post from '@/models/Post'
import { Request, Response } from 'express'


export async function createPost(req: Request, res: Response) {
    console.log('Posting one')
    const dummyPost = new Post({
        title: 'Exciting News!',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec nulla et mauris convallis pharetra. Donec id justo et eros fermentum rhoncus vitae nec nunc.',
        author: 'John Doe',
      });
      console.log(dummyPost)
      try {
        await dummyPost.save();

      } catch (error) {
        console.log(error)
      }
      return res.status(200).json({ message: 'Post created successfully' });

}
