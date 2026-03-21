export interface Poem {
  id: string;
  title: string;
  titlePinyin: string;
  author: string;
  authorPinyin: string;
  dynasty: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  lines: Array<{
    chinese: string;
    pinyin: string;
    english: string;
  }>;
  audioRecitationUrl?: string;
  audioSongUrl?: string;
  meaning: string;
  simpleExplanation: string;
  authorBio: string;
  backgroundImage: string;
  theme?: {
    overlay: string;
    accent: string;
    text: string;
  };
  quiz?: Array<{
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }>;
  musicSheet?: string[];
}

export const poems: Poem[] = [
  {
    id: '1',
    title: '静夜思',
    titlePinyin: 'Jìng Yè Sī',
    author: '李白',
    authorPinyin: 'Lǐ Bái',
    dynasty: 'Tang Dynasty',
    level: 'beginner',
    lines: [
      {
        chinese: '床前明月光',
        pinyin: 'Chuáng qián míng yuè guāng',
        english: 'Before my bed, bright moonlight gleams',
      },
      {
        chinese: '疑是地上霜',
        pinyin: 'Yí shì dì shàng shuāng',
        english: 'Like frost upon the ground it seems'
      },
      {
        chinese: '举头望明月',
        pinyin: 'Jǔ tóu wàng míng yuè',
        english: 'I raise my head to gaze at the moon so bright'
      },
      {
        chinese: '低头思故乡',
        pinyin: 'Dī tóu sī gù xiāng',
        english: 'Then bow it down, homesick in the night'
      }
    ],
    simpleExplanation: 'A traveler cannot sleep at night. The bright moonlight shines through the window and looks like frost on the ground. When he looks up at the moon, he feels homesick and misses his family.',
    meaning: 'This famous poem by Li Bai expresses the poet\'s homesickness while away from home. The simple imagery of moonlight evokes deep feelings of longing for one\'s homeland.',
    authorBio: 'Li Bai (701-762), also known as Li Po, was one of the greatest poets of the Tang Dynasty. Known as the "Immortal Poet," he wrote over 1,000 poems celebrating nature, wine, and friendship. His romantic and imaginative style has influenced Chinese literature for centuries.',
    audioRecitationUrl: '/audio/jingyesi_lang.mp3',
    audioSongUrl: '/audio/jingyesi_song.mp3',
    backgroundImage: 'assets/river-boat.png',
    musicSheet: ['5', '3', '2', '1', '2', '3', '5', '5', '3', '2', '1', '2', '3', '2', '1', '1'],
    theme: {
      overlay: 'rgba(250, 248, 245, 0.85)',
      accent: '#8b7355',
      text: '#3d3229',
    },
    quiz: [
      {
        question: 'Which image is used to express homesickness in this poem?',
        options: ['The bright moonlight', 'The falling leaves', 'The roaring river', 'The wind in the pines'],
        answerIndex: 0,
        explanation: 'The poet describes the bright moonlight on the floor as a symbol of longing for home.',
      },
      {
        question: 'What feeling does the poet experience when he looks at the moon?',
        options: ['Joy', 'Homesickness', 'Anger', 'Fear'],
        answerIndex: 1,
        explanation: 'Looking at the moon reminds the poet of his distant home, causing homesickness.',
      },
    ],
  },
  {
    id: '2',
    title: '春晓',
    titlePinyin: 'Chūn Xiǎo',
    author: '孟浩然',
    authorPinyin: 'Mèng Hào Rán',
    dynasty: 'Tang Dynasty',
    level: 'beginner',
    lines: [
      {
        chinese: '春眠不觉晓',
        pinyin: 'Chūn mián bù jué xiǎo',
        english: 'In spring sleep, unaware of dawn'
      },
      {
        chinese: '处处闻啼鸟',
        pinyin: 'Chù chù wén tí niǎo',
        english: 'Everywhere I hear birds sing'
      },
      {
        chinese: '夜来风雨声',
        pinyin: 'Yè lái fēng yǔ shēng',
        english: 'Last night the sound of wind and rain'
      },
      {
        chinese: '花落知多少',
        pinyin: 'Huā luò zhī duō shǎo',
        english: 'How many blossoms fell, I wonder'
      }
    ],
    simpleExplanation: 'The poet sleeps so soundly in spring that he doesn\'t notice morning has come. He wakes up to birds singing everywhere. He remembers hearing wind and rain during the night, and wonders how many flower petals have fallen.',
    meaning: 'Meng Haoran captures the peaceful beauty of a spring morning, awakening to birdsong and contemplating the previous night\'s storm.',
    authorBio: 'Meng Haoran (689-740) was a renowned Tang Dynasty poet known for his landscape and pastoral poetry. He lived a quiet life in the mountains, declining government positions to focus on poetry and nature. His work reflects a deep appreciation for rural simplicity and natural beauty.',
    audioRecitationUrl: '/audio/chunxiao_lang.mp3',
    audioSongUrl: '/audio/chunxiao_song.mp3',
    backgroundImage: 'assets/river-boat.png',
    musicSheet: ['3', '5', '6', '5', '3', '2', '1', '2', '3', '3', '3', '2', '2', '2', '1', '2', '3', '3', '3', '2', '2', '1', '2', '3'],
    theme: {
      overlay: 'rgba(245, 241, 232, 0.85)',
      accent: '#a89984',
      text: '#3d3229',
    },
    quiz: [
      {
        question: 'What does the poet notice when he wakes up in spring?',
        options: ['Snow on the ground', 'Birds singing', 'A full moon', 'Thunder in the distance'],
        answerIndex: 1,
        explanation: 'The poem describes waking up to the sound of birds singing all around.',
      },
      {
        question: 'The poet wonders how many blossoms have fallen after hearing:',
        options: ['The wind and rain', 'The birds singing', 'The moon rising', 'The river flowing'],
        answerIndex: 0,
        explanation: 'He remembers the wind and rain from the night before and wonders how many flowers fell.',
      },
    ],
  },
  {
    id: '3',
    title: '登鹳雀楼',
    titlePinyin: 'Dēng Guàn Què Lóu',
    author: '王之涣',
    authorPinyin: 'Wáng Zhī Huàn',
    dynasty: 'Tang Dynasty',
    level: 'intermediate',
    lines: [
      {
        chinese: '白日依山尽',
        pinyin: 'Bái rì yī shān jìn',
        english: 'The white sun sets behind the mountains'
      },
      {
        chinese: '黄河入海流',
        pinyin: 'Huáng hé rù hǎi liú',
        english: 'The Yellow River flows into the sea'
      },
      {
        chinese: '欲穷千里目',
        pinyin: 'Yù qióng qiān lǐ mù',
        english: 'To see a thousand miles afar'
      },
      {
        chinese: '更上一层楼',
        pinyin: 'Gèng shàng yī céng lóu',
        english: 'Climb one more story of the tower'
      }
    ],
    simpleExplanation: 'Standing on a tall tower, the poet watches the sun set behind mountains and the Yellow River flowing to the sea. He realizes that if he wants to see even further, he must climb higher. This teaches us that to achieve more, we must make greater efforts.',
    meaning: 'This poem conveys the idea that to gain a broader perspective and achieve greater understanding, one must continue to strive and reach higher.',
    authorBio: 'Wang Zhihuan (688-742) was a Tang Dynasty poet famous for his frontier and landscape poetry. Though only six of his poems survive today, they are considered masterpieces of Chinese literature, known for their grand imagery and philosophical depth.',
    audioRecitationUrl: '/audio/dengguanquelou_lang.mp3',
    audioSongUrl: '/audio/dengguanquelou_song.mp3',
    backgroundImage: 'assets/river-boat.png',
    musicSheet: ['5', '6', '5', '3', '2', '1', '2', '3', '5', '5', '6', '5', '3', '2', '1', '2', '3', '2', '1', '1'],
    theme: {
      overlay: 'rgba(250, 248, 245, 0.88)',
      accent: '#bfad8f',
      text: '#3d3229',
    },
    quiz: [
      {
        question: 'What is the main message of the poem?',
        options: ['To climb higher for a better view', 'To stay at home', 'To rest under a tree', 'To write poetry'],
        answerIndex: 0,
        explanation: 'The poem encourages striving higher to expand one\'s sight and understanding.',
      },
      {
        question: 'What natural feature is used to represent reaching far?',
        options: ['The Yellow River', 'The moon', 'A mountain', 'A tower'],
        answerIndex: 3,
        explanation: 'The poem speaks of climbing one more floor of the tower to see farther.',
      },
    ],
  },
  {
    id: '4',
    title: '咏柳',
    titlePinyin: 'Yǒng Liǔ',
    author: '贺知章',
    authorPinyin: 'Hè Zhī Zhāng',
    dynasty: 'Tang Dynasty',
    level: 'intermediate',
    lines: [
      {
        chinese: '碧玉妆成一树高',
        pinyin: 'Bì yù zhuāng chéng yī shù gāo',
        english: 'A tall tree dressed in jade green'
      },
      {
        chinese: '万条垂下绿丝绦',
        pinyin: 'Wàn tiáo chuí xià lǜ sī tāo',
        english: 'Ten thousand threads of green silk hanging down'
      },
      {
        chinese: '不知细叶谁裁出',
        pinyin: 'Bù zhī xì yè shuí cái chū',
        english: 'I wonder who cut these thin leaves'
      },
      {
        chinese: '二月春风似剪刀',
        pinyin: 'Èr yuè chūn fēng sì jiǎn dāo',
        english: 'The February spring wind is like scissors'
      }
    ],
    simpleExplanation: 'The poet compares a willow tree to a beautiful woman dressed in green. The branches hang down like green silk ribbons. He wonders who could have cut the delicate leaves, and realizes it was the spring wind of February, which is like a pair of scissors.',
    meaning: 'He Zhizhang celebrates the beauty of a willow tree in spring, using vivid imagery to describe its graceful appearance and attributing its beauty to the spring wind.',
    authorBio: 'He Zhizhang (659-744) was a Tang Dynasty poet and calligrapher. He was known for his straightforward and lively poetry, often celebrating nature and the simple joys of life. His works are characterized by their clarity and vivid imagery.',
    audioRecitationUrl: '/audio/yongliu_lang.mp3',
    audioSongUrl: '/audio/yongliu_song.mp3',
    backgroundImage: 'assets/river-boat.png',
    musicSheet: ['2', '3', '5', '3', '2', '1', '2', '3', '5', '5', '3', '2', '1', '2', '3', '2', '1', '1'],
    theme: {
      overlay: 'rgba(240, 245, 235, 0.85)',
      accent: '#6b8e23',
      text: '#2f4f2f',
    },
    quiz: [
      {
        question: 'What does the poet compare the willow tree to?',
        options: ['A beautiful woman', 'A green river', 'A tall mountain', 'A golden palace'],
        answerIndex: 0,
        explanation: 'The poet describes the willow tree as being "dressed in jade green," comparing it to a beautiful woman.',
      },
      {
        question: 'What does the poet say is like scissors?',
        options: ['The spring wind', 'A knife', 'A bird', 'The sun'],
        answerIndex: 0,
        explanation: 'The poet says the February spring wind is like scissors that cut the delicate willow leaves.',
      },
    ],
  },
  {
    id: '5',
    title: '枫桥夜泊',
    titlePinyin: 'Fēng Qiáo Yè Bó',
    author: '张继',
    authorPinyin: 'Zhāng Jì',
    dynasty: 'Tang Dynasty',
    level: 'advanced',
    lines: [
      {
        chinese: '月落乌啼霜满天',
        pinyin: 'Yuè luò wū tí shuāng mǎn tiān',
        english: 'Moon sets, crows cry, frost fills all the sky'
      },
      {
        chinese: '江枫渔火对愁眠',
        pinyin: 'Jiāng fēng yú huǒ duì chóu mián',
        english: 'River maples, fishing fires face my worried sleep'
      },
      {
        chinese: '姑苏城外寒山寺',
        pinyin: 'Gū sū chéng wài Hán Shān Sì',
        english: 'Outside Gusu city stands Cold Mountain Temple'
      },
      {
        chinese: '夜半钟声到客船',
        pinyin: 'Yè bàn zhōng shēng dào kè chuán',
        english: 'At midnight, the bell sounds reach my traveler\'s boat'
      }
    ],
    simpleExplanation: 'A lonely traveler stays on his boat by Maple Bridge at night. The moon sets, crows call, frost covers everything. He sees maple trees and fishing boat lights. From the distant Cold Mountain Temple, midnight bells ring out, reaching his lonely boat.',
    meaning: 'Zhang Ji paints a melancholic scene of a lonely traveler moored by Maple Bridge, awakened by temple bells in the night, capturing the essence of solitude and contemplation.',
    authorBio: 'Zhang Ji (around 715-779) was a Tang Dynasty poet. Little is known about his life, but this single poem, "Mooring by Maple Bridge at Night," has made him immortal in Chinese literature. The poem is so famous that the Hanshan Temple bell still attracts countless visitors today.',
    audioRecitationUrl: '/audio/fengqiaoyebo_lang.mp3',
    audioSongUrl: '/audio/fengqiaoyebo_song.mp3',
    backgroundImage: 'assets/river-boat.png',
    musicSheet: ['3', '5', '6', '5', '3', '2', '1', '2', '3', '5', '6', '5', '3', '2', '1', '2', '3', '2', '1', '1'],
    theme: {
      overlay: 'rgba(237, 235, 229, 0.88)',
      accent: '#8b7355',
      text: '#3d3229',
    },
    quiz: [
      {
        question: 'What time of day does the poem describe?',
        options: ['Morning', 'Noon', 'Night', 'Evening'],
        answerIndex: 2,
        explanation: 'The poem describes the scene at night with moonlight and bells.',
      },
      {
        question: 'Where is the poet when he hears the bell?',
        options: ['On a boat', 'In a mountain temple', 'At home', 'In the market'],
        answerIndex: 0,
        explanation: 'The poet is on a boat, moored near the temple, when he hears the bell.',
      },
    ],
  },
  {
    id: '6',
    title: '山居秋暝',
    titlePinyin: 'Shān Jū Qiū Míng',
    author: '王维',
    authorPinyin: 'Wáng Wéi',
    dynasty: 'Tang Dynasty',
    level: 'advanced',
    lines: [
      {
        chinese: '空山新雨后',
        pinyin: 'Kōng shān xīn yǔ hòu',
        english: 'After fresh rain in the empty mountains'
      },
      {
        chinese: '天气晚来秋',
        pinyin: 'Tiān qì wǎn lái qiū',
        english: 'Autumn arrives as evening falls'
      },
      {
        chinese: '明月松间照',
        pinyin: 'Míng yuè sōng jiān zhào',
        english: 'Moonlight shines through pine trees'
      },
      {
        chinese: '清泉石上流',
        pinyin: 'Qīng quán shí shàng liú',
        english: 'Clear spring flows over rocks'
      }
    ],
    simpleExplanation: 'After a fresh rain, the mountains are empty and quiet. As evening comes, the weather feels like autumn. The bright moon shines through the pine trees, and a clear spring flows over the rocks. This peaceful scene shows the beauty of nature in the mountains.',
    meaning: 'Wang Wei captures the serene beauty of an autumn evening in the mountains, emphasizing the harmony between nature and the human spirit.',
    authorBio: 'Wang Wei (701-761) was a Tang Dynasty poet, painter, musician, and statesman. He is considered one of the greatest poets and painters in Chinese history. His poetry is known for its serene Buddhist influence and beautiful depictions of nature.',
    audioRecitationUrl: '/audio/shanqiuxiuming_lang.mp3',
    audioSongUrl: '/audio/shanqiuxiuming_song.mp3',
    backgroundImage: 'assets/river-boat.png',
    musicSheet: ['2', '3', '5', '3', '2', '1', '2', '3', '5', '6', '5', '3', '2', '1', '2', '3', '2', '1', '1'],
    theme: {
      overlay: 'rgba(240, 245, 250, 0.85)',
      accent: '#4682b4',
      text: '#2f4f4f',
    },
    quiz: [
      {
        question: 'When does the poem take place?',
        options: ['Early morning', 'Midday', 'Evening', 'Midnight'],
        answerIndex: 2,
        explanation: 'The poem describes the scene as evening falls, with the moon rising.',
      },
      {
        question: 'What natural elements are described in the poem?',
        options: ['Rain, moon, pine trees, spring', 'Sun, wind, flowers, birds', 'Snow, ice, mountains, rivers', 'Clouds, stars, grass, insects'],
        answerIndex: 0,
        explanation: 'The poem mentions fresh rain, moonlight, pine trees, and a clear spring.',
      },
    ],
  }
];