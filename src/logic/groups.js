import Group from '../models/group.js'
import Genre from '../models/genre.js'
import User from '../models/user.js'

export const getGroups = async group => {
  try {
    let groups

    if (!group) {
      groups = []

      const res = await Group.find()

      res.map(group => {
        groups.push(group.name)
      })
    }

    if (group) groups = await Group.findOne({ name: group }, '_id name')

    return {
      status: 200,
      data: {
        groups
      }
    }
  } catch (error) {
    if (error.code === 11000)
      return {
        status: 400,
        data: {
          message: 'Group already exits'
        }
      }

    return {
      status: 500,
      data: {
        message: 'Internal server error'
      }
    }
  }
}
export const postGroup = async group => {
  try {
    let genres = []

    for (const tempGenre of group.genres) {
      const _genre = await Genre.findOne({ name: tempGenre })
      if (!_genre) return { status: 404, data: { message: 'Genre not found' } }

      genres.push(_genre._id)
    }

    const newGroup = new Group({
      name: group.name,
      fundationDate: group.fundationDate,
      members: group.members,
      genres
    })
    await newGroup.save()

    const res = {
      status: 201,
      data: {
        newGroup
      }
    }
    return res
  } catch (error) {
    if (error.code === 11000)
      return {
        status: 400,
        data: {
          message: 'Group already exits'
        }
      }

    return {
      status: 500,
      data: {
        message: 'Internal server error'
      }
    }
  }
}

export const deleteGroup = async groupId => {
  try {
    await Group.findByIdAndRemove(groupId)

    await User.updateMany({ groups: groupId }, { $pull: { groups: groupId } })

    return {
      status: 200,
      data: {
        message: 'Group deleted successfully'
      }
    }
  } catch (error) {
    return {
      status: 500,
      data: {
        message: 'Internal server error'
      }
    }
  }
}
