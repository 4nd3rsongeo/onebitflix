// src/models/index.ts

import { Category } from './Category'
import { Course } from './Course'
import { Episode } from './Episode'
import { Favorite } from './Favorite'
import { User } from './User'
import { Like } from './Like'

Category.hasMany(Course, {as: 'courses'})

Course.belongsTo(Category)
Course.belongsToMany(User, {through: Favorite}) //relação muitos pra muitos através do model Favorite
Course.belongsToMany(User, {through: Like})
Course.hasMany(Episode, {as: 'episodes'})
Course.hasMany(Favorite,  {as: 'FavoritesUsers', foreignKey: 'course_id' })
//Course.hasMany(Like, {as: 'LikesCourses', foreignKey: 'course_id'})

Episode.belongsTo(Course)

Favorite.belongsTo(Course)
Favorite.belongsTo(User)

//Like.belongsTo(Course)
//Like.belongsTo(User)

User.belongsToMany(Course, {through: Favorite}) //relação muitos pra muitos através do model Favorite
User.belongsToMany(Course, {through: Like})
User.hasMany(Favorite, { as: 'FavoritesCourses', foreignKey: 'user_id' })
//User.hasMany(Like, { as: 'LikesCourses', foreignKey: 'user_id' })


export {
  Category,
  Course,
  Episode,
  Favorite,
  Like,
  User
}