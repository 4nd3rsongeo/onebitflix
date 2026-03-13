// src/models/index.ts

import { Category } from './Category.js'
import { Course } from './Course.js'
import { Episode } from './Episode.js'
import { Favorite } from './Favorite.js'
import { User } from './User.js'
import { Like } from './Like.js'
import { WatchTime } from './WatchTime.js'

Category.hasMany(Course, {as: 'courses'})

Course.belongsTo(Category)
Course.belongsToMany(User, {through: Favorite}) //relação muitos pra muitos através do model Favorite
Course.belongsToMany(User, {through: Like})
Course.hasMany(Episode, {as: 'episodes'})
Course.hasMany(Favorite,  {as: 'FavoritesUsers', foreignKey: 'course_id' })
Course.hasMany(Like, {as: 'LikesCourses', foreignKey: 'course_id'})

Episode.belongsTo(Course)
Episode.belongsToMany(User, {through: WatchTime})

Favorite.belongsTo(Course)
Favorite.belongsTo(User)

// Like.belongsTo(Course)
// Like.belongsTo(User)

User.belongsToMany(Course, {through: Favorite}) //relação muitos pra muitos através do model Favorite
User.belongsToMany(Course, {through: Like})
User.belongsToMany(Episode, {through: WatchTime})
User.hasMany(Favorite, { as: 'FavoritesCourses', foreignKey: 'user_id' })
User.hasMany(Like, { as: 'LikesCourses', foreignKey: 'user_id' })


export {
  Category,
  Course,
  Episode,
  Favorite,
  Like,
  User,
  WatchTime
}