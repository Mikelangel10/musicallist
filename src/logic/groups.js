import Group from '../models/group.js'
import Genre from '../models/genre.js'
import User from '../models/user.js'
import { duplicity } from '../utils/mongoErrors.js'
import { serverError } from '../utils/statusErrors.js'

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
    return serverError()
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
    if (error.code) return duplicity(error.code)

    return serverError()
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
    return serverError()
  }
}

export const addGroupByIdToUserById = async (userId, groupId) => {
  try {
    const group = await Group.findById(groupId)
    if (!group)
      return {
        status: 404,
        data: {
          message: 'Group not found'
        }
      }

    const user = await User.findByIdAndUpdate(
      { _id: userId, groups: { $ne: groupId } },
      { $addToSet: { groups: group } }
    )
    if (user) {
      if (user.groups.includes(groupId)) {
        return {
          status: 400,
          data: {
            message: 'Group alredy exists in user'
          }
        }
      } else {
        return {
          status: 200,
          data: {
            message: 'Group added to user'
          }
        }
      }
    } else {
      return {
        status: 404,
        data: {
          message: 'User not found'
        }
      }
    }
  } catch (error) {
    console.log(error)

    return serverError()
  }
}

export const deleteGroupByIdToUserById = async (userId, groupId) => {
  try {
    await Group.findByIdAndRemove(groupId)
    await User.updateMany({ groups: groupId }, { $pull: { groups: groupId } })
    await User.updateMany({ users: userId }, { $pull: { users: userId } })
    return {
      status: 200,
      data: {
        message: 'Group deleted successfully'
      }
    }
  } catch (error) {
    return serverError()
  }
}
