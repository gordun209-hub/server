import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

import { artistsData } from './songsData'

const prisma = new PrismaClient()
const run = async () => {
  await Promise.all(
    //! loop trough data and create users, each user creates song
    artistsData.map(async artist => {
      //! upsert means if user exists, update, if not, create
      return prisma.artist.upsert({
        // where condition to find user by name
        where: { name: artist.name },
        update: {},
        // create new user with name and songs
        create: {
          name: artist.name,
          image: artist.image,
          //* find and create songs for each user
          songs: {
            create: artist.songs.map(({ name, url, duration }) => ({
              name,
              duration,
              url
            }))
          }
        }
      })
    })
  )
  const salt = bcrypt.genSaltSync()
  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      firstName: 'Awlihan',
      lastName: 'Aydin',
      email: 'userw@test.com',
      password: bcrypt.hashSync('123456', salt)
    }
  })
  const songs = await prisma.song.findMany({})
  await Promise.all(
    new Array(10).fill(1).map(async (_, i) => {
      return prisma.playlist.create({
        data: {
          name: `Playlist #${i + 1}`,
          user: {
            connect: { id: user.id }
          },
          songs: {
            connect: songs.map(song => ({
              id: song.id
            }))
          }
        }
      })
    })
  )
}

run()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
