import { User } from "../models/index.js";
function filterLastEpisodesByCourse(episodes) {
    const coursesOnList = [];
    const lastEpisodes = episodes.reduce((currentList, episode) => {
        if (!coursesOnList.includes(episode.courseId)) {
            coursesOnList.push(episode.courseId);
            currentList.push(episode);
            return currentList;
        }
        const episodeFromSameCourse = currentList.find(ep => ep.courseId === episode.courseId);
        if (episodeFromSameCourse.order > episode.order)
            return currentList;
        const listWhithoutEpisodeFromSameCourse = currentList.filter(ep => ep.courseId !== episode.courseId);
        listWhithoutEpisodeFromSameCourse.push(episode);
        return listWhithoutEpisodeFromSameCourse;
    }, []);
    return lastEpisodes;
}
export const userService = {
    findByEmail: async (email) => {
        const user = await User.findOne({
            where: {
                email
            }
        });
        return user;
    },
    create: async (attributes) => {
        const user = await User.create(attributes);
        return user;
    },
    update: async (id, attributes) => {
        const [affectedRows, updatedUsers] = await User.update(attributes, { where: { id }, returning: true });
        return updatedUsers[0];
    },
    updatePassword: async (id, password) => {
        const [affectedRows, updatedUsers] = await User.update({ password }, {
            where: { id },
            returning: true,
            individualHooks: true
        });
        return updatedUsers[0];
    },
    // getKeepWatchingList: async (id: number) => {
    //     const userWithWatchingEpisodes = await User.findByPk(id, {
    //         include: {
    //             association: 'Episodes',
    //             include: [{
    //                 association: 'Courses'
    //             }],
    //             through: {
    //                 as: 'watchTime'
    //             }
    //         }
    //     })
    //     if(!userWithWatchingEpisodes) throw new Error('Usuário não encontrado.')
    //     const keepWatchingList = filterLastEpisodesByCourse((userWithWatchingEpisodes as any).Episodes!)
    //     //@ts-ignore
    //     keepWatchingList.sort((a,b) => a.watchTime!.updatedAt < b.watchTime.updatedAt ? 1 : -1)
    //     return keepWatchingList
    // }
    getKeepWatchingList: async (id) => {
        const userWithWatchingEpisodes = await User.findByPk(id, {
            include: {
                association: 'Episodes',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    'order',
                    ['video_url', 'videoUrl'],
                    ['seconds_long', 'secondsLong'],
                    ['course_id', 'courseId']
                ],
                include: [{
                        association: 'Course',
                        attributes: [
                            'id',
                            'name',
                            'synopsis',
                            ['thumbnail_url', 'thumbnailUrl']
                        ],
                        as: 'course'
                    }],
                through: {
                    as: 'watchTime',
                    attributes: [
                        'seconds',
                        ['updated_at', 'updatedAt']
                    ]
                }
            }
        });
        if (!userWithWatchingEpisodes)
            throw new Error('Usuário não encontrado.');
        const keepWatchingList = filterLastEpisodesByCourse(userWithWatchingEpisodes.Episodes);
        // @ts-ignore
        keepWatchingList.sort((a, b) => a.watchTime.updatedAt < b.watchTime.updatedAt ? 1 : -1);
        return keepWatchingList;
    }
};
