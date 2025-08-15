import TheresaWebb from '../../assets/Users/theresa.png';
import JohnDoe from '../../assets/Users/john-doe.png';
import JaneDoe from '../../assets/Users/jane-doe.png';

export const comments = [
    {
        user: {
            avatar: TheresaWebb,
            name: 'Theresa Webb',
        },
        message: {
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            timeStamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
            liked: false
        }
    },
    {
        user: {
            avatar: JohnDoe,
            name: 'John Doe',
        },
        message: {
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            timeStamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
            liked: false
        }
    },
    {
        user: {
            avatar: JaneDoe,
            name: 'Jane Doe',
        },
        message: {
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            timeStamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            liked: false
        }
    }
]