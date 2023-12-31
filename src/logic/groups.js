import Group from '../models/group.js'
import Genre from '../models/genre.js'
import User from '../models/user.js'
import { duplicity } from '../utils/mongoErrors.js'
import { serverError } from '../utils/statusErrors.js'

export const getGroups = async group => {
  try {
    let groups

    group
      ? (groups = await Group.findOne({ name: group }))
      : (groups = await Group.find())

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
    const genres = []

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
    if (!group) {
      return {
        status: 404,
        data: {
          message: 'Group not found'
        }
      }
    }

    const user = await User.findByIdAndUpdate(
      { _id: userId, groups: { $ne: groupId } },
      { $addToSet: { groups: group } }
    )
    if (!user) {
      return {
        status: 404,
        data: {
          message: 'User not found'
        }
      }
    }
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
  } catch (error) {
    console.log(error)

    return serverError()
  }
}

export const deleteGroupByIdToUserById = async (userId, groupId) => {
  try {
    if (!(await Group.findById(groupId))) {
      return {
        status: 404,
        data: {
          message: 'Group not found'
        }
      }
    }

    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { groups: groupId } }
    )

    if (!user) {
      return {
        status: 404,
        data: {
          message: 'User not found'
        }
      }
    } else {
      if (!user.groups.includes(groupId)) {
        return {
          status: 404,
          data: {
            message: 'Group not found in user'
          }
        }
      } else {
        return {
          status: 200,
          data: {
            message: 'Group deleted to user successfully'
          }
        }
      }
    }
  } catch (error) {
    return serverError()
  }
}
