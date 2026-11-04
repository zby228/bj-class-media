/* K12 新媒体工作台 · 纯前端逻辑（无接口） */
var BJCM = (function () {
  var GRADES = [
    { id: 'you', label: '幼儿', audience: '幼儿家长', tone: '短句、有画面、让人安心', avoid: '不评比谁更聪明，不写恐吓式安全话术' },
    { id: 'pl', label: '小学低年级', audience: '一到三年级的家长和孩子', tone: '具体、好懂、带着陪伴', avoid: '不把习惯写成打卡命令，不横向比较' },
    { id: 'ph', label: '小学高年级', audience: '四到六年级的家长和学生', tone: '把方法和节奏讲明白', avoid: '不渲染升学恐慌，不承诺录取' },
    { id: 'ms', label: '初中', audience: '初中学生和家长', tone: '尊重学生自己的判断，信息清楚', avoid: '不晒排名，不贩卖中考焦虑' },
    { id: 'hs', label: '高中', audience: '高中学生和家长', tone: '短、稳，把选择和节奏说清楚', avoid: '不晒分数，不倒计时恐吓' }
  ];

  var FUNNELS = [
    { id: 'ops', label: '内容运营', tag: '内容运营', blurb: '持续产出给家长和学生看的内容', tone: '把一件具体的事讲清楚，方便持续更新', avoid: '不空喊品牌口号，不编造成果' },
    { id: 'acq', label: '引流', tag: '引流获客', blurb: '把还没进来的人带到公开内容或咨询入口', tone: '给一个能转发的理由', avoid: '不承诺结果，不伪造热度' },
    { id: 'keep', label: '续养/续费', tag: '续费沟通', blurb: '让在读家庭看见收获，再谈下一阶段', tone: '先讲收获，再轻轻提起下一阶段', avoid: '不恐吓流失，不比较孩子' },
    { id: 'year', label: '年信', tag: '年度问候', blurb: '写给家长和学生的年度问候', tone: '像一封可以留存的信，具体而克制', avoid: '不评比排名，不把祝福写成广告' },
    { id: 'enroll', label: '报名转化', tag: '报名转化', blurb: '把正在考虑的人带到报名的下一步', tone: '讲清适合谁和下一步怎么做', avoid: '不暗示隐藏名额，不制造虚假紧迫' }
  ];

  var PLATFORMS = [
    { id: 'xhs', label: '小红书' },
    { id: 'dy', label: '抖音' },
    { id: 'sph', label: '视频号' },
    { id: 'mp', label: '公众号' },
    { id: 'bili', label: 'B站' },
    { id: 'ks', label: '快手' }
  ];

  var TARGETS = [
    { id: 'xhs', label: '小红书图文', kind: 'post' },
    { id: 'sph', label: '视频号', kind: 'post' },
    { id: 'dy', label: '抖音', kind: 'post' },
    { id: 'moments', label: '朋友圈', kind: 'post' },
    { id: 'dm', label: '私聊话术', kind: 'dm' }
  ];

  var COMPOSE = {
    xhs: {
      label: '小红书',
      href: 'https://creator.xiaohongshu.com/publish/publish',
      step: '打开创作页后自行登录。把标题、正文、话题粘进图文框，配图手动上传。最后由你点击发布。'
    },
    dy: {
      label: '抖音',
      href: 'https://creator.douyin.com/creator-micro/content/upload',
      step: '打开创作者平台后自行上传视频，粘贴标题和文案。本页不会自动填表，也不会替你点发布。'
    },
    sph: {
      label: '视频号',
      href: 'https://channels.weixin.qq.com/platform/post/create',
      step: '视频号助手需要你自己登录。粘贴描述后，由你点击发表。没有网页代填。'
    },
    moments: {
      label: '朋友圈',
      href: '',
      step: '朋友圈没有公开创作链接。复制文案，打开微信，粘贴后由你点击发表。这一版不带 # 话题。'
    },
    dm: {
      label: '私聊',
      href: '',
      step: '把 {昵称} 和 {学段} 换成真实称呼后再发送。工作台不会打开聊天窗口，也不会代发。'
    }
  };

  var LEXICON = [
    { w: '泄题', level: 'high' },
    { w: '考题答案', level: 'high' },
    { w: '作弊', level: 'high' },
    { w: '代考', level: 'high' },
    { w: '包过', level: 'high' },
    { w: '保过', level: 'high' },
    { w: '保录取', level: 'high' },
    { w: '包录取', level: 'high' },
    { w: '内部名额', level: 'high' },
    { w: '内部价', level: 'high' },
    { w: '保送内定', level: 'high' },
    { w: '身份证', level: 'high' },
    { w: '准考证', level: 'high' },
    { w: '家庭住址', level: 'high' },
    { w: '扫码领取', level: 'high' },
    { w: '加微信领', level: 'high' },
    { w: '私下收费', level: 'high' },
    { w: '最强', level: 'mid' },
    { w: '全市第一', level: 'mid' },
    { w: '年级第一', level: 'mid' },
    { w: '必看', level: 'mid' },
    { w: '震惊', level: 'mid' },
    { w: '逆袭', level: 'mid' },
    { w: '保分', level: 'mid' },
    { w: '提分秘籍', level: 'mid' },
    { w: '不看后悔', level: 'mid' },
    { w: '顶级', level: 'mid' },
    { w: '稳上', level: 'mid' },
    { w: '押题', level: 'mid' },
    { w: '全网最低', level: 'mid' }
  ];

  var KEYWORDS = ['体验课', '公开课', '开放日', '家长课堂', '兴趣课', '小升初', '入园', '阅读', '习惯', '中考', '选科', '志愿', '续费', '年信', '报名', '研学', '新年', '暑假'];

  var DEMO_SCENE = {
    '体验课': '体验课结束时，家长问的不是口号，而是孩子适不适合、下一场什么时候开。内容只写现场的一个细节和下一步，名额以官方通知为准。',
    '公开课': '公开课的评论区里，家长留下的是一个具体问题。引流稿把问题收好，不把在线人数写成战报。',
    '开放日': '幼儿园开放日，家长在门口先找的是饮水处和接送点。一条短内容把路线和「适合谁来看」写清楚。',
    '入园': '入园第一周，画面里更适合出现书包和水杯。文案给家长一颗定心丸，不评比谁适应得快。',
    '阅读': '低年级阅读分享，家长愿意转发的是一张书单和一句孩子的原话，不是打卡天数。',
    '习惯': '习惯卡只写一件做得到的小事，比如书包今晚自己收好。不写成军令状，也不和别的孩子比。',
    '小升初': '小升初说明只整理家长在问的三个问题：时间、适合谁、要准备什么。不承诺录取，不渲染恐慌。',
    '中考': '中考规划内容把节奏讲清楚，不贩卖焦虑，不晒排名，不预测考题。',
    '选科': '高中选科咨询用三问帮学生和家长对齐：兴趣、作息、愿不愿意再问一次。不承诺能选对。',
    '志愿': '志愿内容从「你更想把下一段生活过成什么样」开口，只演示沟通顺序，不代做决定。',
    '续费': '续费沟通先写这一阶段看得见的变化，再轻轻提起下一阶段。不恐吓流失，不比较孩子。',
    '年信': '年信像一封问候：这一年陪家长和孩子做过的三件小事，一句感谢。不评比，不堆广告。',
    '报名': '报名说明写清适合谁、不适合谁、下一步怎么做。时间名额以机构官方通知为准，只写已经公开的名额。',
    '研学': '研学通知给家长三行：去哪里、准备什么、肖像和安全怎么处理。不把行程写成竞赛。',
    '家长课堂': '家长课堂的标题是一个具体问题，正文给一个可以回家用的做法，结尾是公开的回放或下一场时间。',
    '兴趣课': '兴趣课体验的封面是作品和材料，不是奖状。文案告诉家长这节课适合怎样的孩子。',
    '新年': '新年问候写给在读家庭：一句感谢、一件小事、下一学期见。不夹带虚假紧迫。',
    '暑假': '暑假安排讲清时间段和适合学段，给在读家庭一份可转发说明，也给新家庭一个体验入口。'
  };

  var HOT = {
    xhs: [
      { title: '幼儿开放日，家长真正会问的三件事', hot: '演示热度 92', sub: '幼儿 · 引流', grades: ['you'], goal: 'acq', blurb: '路线、接送和「适不适合」比口号好转发。不评比孩子。' },
      { title: '一年级习惯卡，写一件做得到的小事', hot: '演示热度 88', sub: '小学低年级 · 内容', grades: ['pl'], goal: 'ops', blurb: '书包自己收好，就够做一条。不写成打卡命令。' },
      { title: '四年级阅读周，给家长的三行', hot: '演示热度 84', sub: '小学高年级 · 续养', grades: ['ph'], goal: 'keep', blurb: '在读家庭看见这一周读过什么，再谈下一次活动。' },
      { title: '初中春季班，适合谁来报名', hot: '演示热度 90', sub: '初中 · 报名', grades: ['ms'], goal: 'enroll', blurb: '写清适合谁和下一步。时间名额以官方通知为准。' },
      { title: '高中这一年，一封可以留存的信', hot: '演示热度 81', sub: '高中 · 年信', grades: ['hs'], goal: 'year', blurb: '三件小事加一句感谢。不晒分，不评排名。' },
      { title: '入园第一周，书包和水杯', hot: '演示热度 76', sub: '幼儿 · 内容', grades: ['you'], goal: 'ops', blurb: '给家长安心的画面。不比谁适应得更快。' },
      { title: '低年级兴趣课，封面用作品不用奖状', hot: '演示热度 79', sub: '小学低年级 · 引流', grades: ['pl'], goal: 'acq', blurb: '把还没来过的家长带到公开体验，不伪造热度。' },
      { title: '给低年级在读家庭的新年信', hot: '演示热度 77', sub: '小学低年级 · 年信', grades: ['pl'], goal: 'year', blurb: '一句感谢、一件小事、下学期见。不把祝福写成广告。' },
      { title: '初中在读家庭，这个月的一个变化', hot: '演示热度 73', sub: '初中 · 续养', grades: ['ms'], goal: 'keep', blurb: '先讲收获，再轻轻提起下一阶段。不逼单。' }
    ],
    dy: [
      { title: '别划，入园适应里安静的那一秒', hot: '演示热度 86', sub: '幼儿 · 15秒', grades: ['you'], goal: 'ops', blurb: '第一帧给水杯或书包。字幕短，不评比。' },
      { title: '兴趣课体验，家长会问的那句', hot: '演示热度 83', sub: '小学低年级 · 引流', grades: ['pl'], goal: 'acq', blurb: '适不适合，比口号有用。结尾留一个真实问题。' },
      { title: '小学高年级的一封新年短信', hot: '演示热度 77', sub: '年信', grades: ['ph'], goal: 'year', blurb: '感谢、一件小事、下学期见。不夹广告堆砌。' },
      { title: '初中续费前，先讲阶段收获', hot: '演示热度 80', sub: '续养', grades: ['ms'], goal: 'keep', blurb: '画面给作品或笔记，不给排名截图。' },
      { title: '高中体验营，下一步写在字幕里', hot: '演示热度 88', sub: '报名', grades: ['hs'], goal: 'enroll', blurb: '适合谁、怎么预约。只写已经公开的名额。' },
      { title: '小升初三问，不渲染恐慌', hot: '演示热度 91', sub: '小学高年级 · 内容', grades: ['ph'], goal: 'ops', blurb: '时间、适合谁、材料。不承诺录取。' },
      { title: '高中规划切片，不贩卖焦虑', hot: '演示热度 74', sub: '引流', grades: ['hs'], goal: 'acq', blurb: '把公开内容的一个问题讲完就停。' },
      { title: '低年级在读月报，一件小事就够', hot: '演示热度 70', sub: '续养', grades: ['pl'], goal: 'keep', blurb: '给已经在读的家庭。不比较孩子。' },
      { title: '幼儿园体验课，适合谁来看', hot: '演示热度 69', sub: '幼儿 · 报名', grades: ['you'], goal: 'enroll', blurb: '写清适合谁和下一步。不暗示隐藏名额，不制造虚假紧迫。' }
    ],
    sph: [
      { title: '给幼儿家长的月度陪伴', hot: '演示热度 75', sub: '续养 · 给家长', grades: ['you'], goal: 'keep', blurb: '在读家庭看得到陪伴。不恐吓，不评比。' },
      { title: '小学低年级体验课，时间怎么写', hot: '演示热度 85', sub: '报名', grades: ['pl'], goal: 'enroll', blurb: '适合谁、下一步、名额以官方通知为准。' },
      { title: '小升初说明，只整理问题', hot: '演示热度 89', sub: '引流', grades: ['ph'], goal: 'acq', blurb: '把还在观望的家长带到公开说明，不承诺录取。' },
      { title: '初中年末问候，不评排名', hot: '演示热度 72', sub: '年信', grades: ['ms'], goal: 'year', blurb: '一封短视频口播版的年度问候。' },
      { title: '高中选科内容，不承诺能选对', hot: '演示热度 84', sub: '内容运营', grades: ['hs'], goal: 'ops', blurb: '三问：兴趣、作息、愿不愿意再问一次。' },
      { title: '幼儿园年末，三件小事', hot: '演示热度 68', sub: '年信', grades: ['you'], goal: 'year', blurb: '给家长留存。不把祝福写成招生广告。' },
      { title: '初中家长课堂，一个可以回家用的做法', hot: '演示热度 78', sub: '内容', grades: ['ms'], goal: 'ops', blurb: '标题是具体问题。结尾只留公开回放。' },
      { title: '高中在读学员的阶段问候', hot: '演示热度 71', sub: '续养', grades: ['hs'], goal: 'keep', blurb: '先讲节奏和状态，不晒分数。' }
    ],
    mp: [
      { title: '【幼儿】入园第一封说明', hot: '演示热度 82', sub: '可留存', grades: ['you'], goal: 'year', blurb: '路线、携带、肖像授权。像一封短笺，不是海报。' },
      { title: '【小学低年级】在读家庭月报', hot: '演示热度 77', sub: '续养', grades: ['pl'], goal: 'keep', blurb: '一件看得见的变化。不写打卡排行。' },
      { title: '【小学高年级】春季班报名说明', hot: '演示热度 90', sub: '报名', grades: ['ph'], goal: 'enroll', blurb: '适合谁、不适合谁、下一步。只写已经公开的名额。' },
      { title: '【初中】公开课引流稿', hot: '演示热度 86', sub: '引流', grades: ['ms'], goal: 'acq', blurb: '一个问题讲完，把人带到公开课。不伪造在线人数。' },
      { title: '【高中】选科咨询怎么写', hot: '演示热度 88', sub: '内容', grades: ['hs'], goal: 'ops', blurb: '给家长和学生一起看。不代做决定。' },
      { title: '【小学低年级】兴趣课体验预告', hot: '演示热度 74', sub: '内容', grades: ['pl'], goal: 'ops', blurb: '作品和材料。告诉家长怎样的孩子适合来。' },
      { title: '【小学高年级】阶段小结', hot: '演示热度 80', sub: '续养', grades: ['ph'], goal: 'keep', blurb: '方法与节奏。不渲染小升初恐慌。' },
      { title: '【初中】报名三行：适合谁', hot: '演示热度 83', sub: '报名', grades: ['ms'], goal: 'enroll', blurb: '时间名额以机构官方通知为准。' }
    ]
  };

  var LOW = [
    ['幼儿开放日三问', '开放日手记', 420, 8600, 2400, 310, 'you', '开放日', '小红书', '家长在门口问的是路线和适不适合。', 'acq'],
    ['入园第一周的水杯', '入园说明', 180, 3200, 1500, 96, 'you', '入园', '视频号', '画面给书包和水杯，文案给家长安心。', 'ops'],
    ['幼儿园年末三件小事', '年度问候', 860, 5400, 980, 240, 'you', '年信', '公众号', '感谢和三件小事，不评比孩子。', 'year'],
    ['托班在读家庭月报', '低幼内容组', 95, 2100, 640, 88, 'you', '续费', '小红书', '先写陪伴，再轻轻说下一阶段。', 'keep'],
    ['一年级习惯卡', '习惯卡', 2600, 12000, 4300, 860, 'pl', '习惯', '小红书', '只写一件做得到的小事，不横向比较。', 'ops'],
    ['兴趣课作品墙', '兴趣课小记', 740, 6800, 1900, 410, 'pl', '兴趣课', '抖音', '封面是作品和材料，用来做引流。', 'acq'],
    ['低年级阅读书单', '阅读角', 1500, 4100, 860, 120, 'pl', '阅读', '视频号', '一张书单加一句原话，比打卡天数好转发。', 'ops'],
    ['低年级体验课名额', '报名台', 390, 15600, 5200, 940, 'pl', '体验课', '小红书', '粉丝不多，收藏很高。写清适合谁。', 'enroll'],
    ['在读家庭的一句感谢', '年度问候', 610, 2300, 770, 64, 'pl', '新年', '公众号', '新年信：感谢、一件小事、下学期见。', 'year'],
    ['四年级自主学习周', '高年级内容', 4800, 22000, 9100, 1600, 'ph', '阅读', '小红书', '把方法讲明白，不渲染升学恐慌。', 'keep'],
    ['小升初问题清单', '小升初问答', 2100, 3600, 1400, 210, 'ph', '小升初', '公众号', '只整理时间、适合谁、材料。', 'acq'],
    ['研学通知三行', '研学通知', 880, 9700, 2600, 530, 'ph', '研学', '抖音', '去哪里、准备什么、肖像怎么处理。', 'ops'],
    ['高年级阶段小结', '在读月报', 340, 4500, 1800, 260, 'ph', '续费', '视频号', '看见收获，再谈下一阶段。', 'keep'],
    ['小学高年级报名说明', '报名台', 3200, 6400, 2100, 300, 'ph', '报名', '公众号', '不暗示隐藏名额，不制造虚假紧迫。', 'enroll'],
    ['初中公开课一个问题', '公开课切片', 560, 18800, 7600, 1200, 'ms', '公开课', '小红书', '把观望的家长带到公开课，不伪造热度。', 'acq'],
    ['初中方法，不晒排名', '初中方法局', 4100, 9800, 3400, 640, 'ms', '中考', '公众号', '节奏和做法。不贩卖焦虑，不预测考题。', 'ops'],
    ['续费前的阶段信', '续费前的信', 270, 5200, 1600, 190, 'ms', '续费', '视频号', '先讲这个月的变化。不逼单。', 'keep'],
    ['初中年度问候', '年度问候', 1900, 7300, 2500, 480, 'ms', '年信', '公众号', '可以留存的一封信，不评排名。', 'year'],
    ['初中体验课适合谁', '体验课现场', 640, 2800, 900, 150, 'ms', '体验课', '抖音', '适合谁、下一步。名额以通知为准。', 'enroll'],
    ['高中选科三问', '高中选择课', 120, 24000, 11000, 860, 'hs', '选科', '小红书', '粉丝很少，互动很高。不承诺能选对。', 'ops'],
    ['志愿沟通的第一句', '志愿一张纸', 4500, 3900, 1200, 140, 'hs', '志愿', '视频号', '只演示沟通顺序，不代做决定。', 'ops'],
    ['高中体验营报名', '报名台', 980, 6100, 2000, 270, 'hs', '报名', '抖音', '字幕里写下一步，不写未公开的价格。', 'enroll'],
    ['高中在读阶段问候', '续费前的信', 70, 890, 420, 36, 'hs', '续费', '公众号', '短、稳。不晒分数。', 'keep'],
    ['给高中家长的年信', '年度问候', 5300, 4100, 980, 220, 'hs', '年信', '小红书', '三件小事。粉丝刚过五千，用来对照筛选。', 'year'],
    ['暑假时间段怎么写', '暑假安排', 7600, 2100, 430, 55, 'pl', '暑假', '小红书', '粉丝过了五千，互动一般，用来对照低粉样本。', 'ops'],
    ['家长课堂回放入口', '家长课堂', 14000, 1800, 260, 40, 'ms', '家长课堂', '公众号', '高粉低互动，会被粉丝上限滤掉。', 'acq'],
    ['开放日接送点', '开放日手记', 300, 11200, 3900, 700, 'you', '开放日', '抖音', '一条路线讲完就停，不收集电话。', 'acq']
  ].map(function (row, i) {
    return {
      id: 'lf' + i,
      title: row[0],
      author: row[1],
      fans: row[2],
      like: row[3],
      save: row[4],
      comment: row[5],
      grade: row[6],
      kw: row[7],
      plat: row[8],
      blurb: row[9],
      goal: row[10],
      hue: (i * 47) % 360
    };
  });

  var SEEDS = {
    you: ['开放日家长会问的三件事', '入园第一周的安抚', '亲子阅读的一个画面', '在读家庭的月度陪伴', '幼儿园年末的三件小事', '体验课适合怎样的孩子', '下一周可拍的作品角'],
    pl: ['习惯卡只写一件小事', '阅读分享的三行', '兴趣课体验怎么预告', '低年级家长课堂', '续费前看得见的变化', '给在读家庭的新年信', '春季班适合谁'],
    ph: ['自主学习周的一个方法', '小升初问题清单', '研学通知三行', '高年级在读月报', '给家长的年终信', '体验课引流的一个细节', '报名时间以通知为准'],
    ms: ['学习方法公开课', '中考规划不贩卖焦虑', '初中家长沟通纪要', '续费前先讲收获', '年度问候不排名', '体验课的报名路径', '学生自己的一句话'],
    hs: ['选科咨询的三问', '志愿沟通的顺序', '高中体验营说明', '在读学员的阶段信', '新年给家长的留存稿', '报名转化的三行', '心态内容不倒计时']
  };

  var WEEK_META = [
    ['周一', '内容运营', '用一个具体细节，方便家长转发', 'ops'],
    ['周二', '引流', '给一个公开入口，不伪造热度', 'acq'],
    ['周三', '续养', '给在读家庭讲这周的收获', 'keep'],
    ['周四', '年信', '写成可以留存的问候', 'year'],
    ['周五', '报名', '写清适合谁和下一步', 'enroll'],
    ['周六', '案例', '一个家长和学生都看得懂的故事', 'ops'],
    ['周日', '预告', '下周可以拍的一个画面', 'acq']
  ];

  var SKILLS = [
    { id: 'hook', title: '选题钩子', text: '第一句写家长或学生能看见的细节，不要写「大家好」。例如：开放日那天，家长在门口先找的是接送点。标题里出现学段和具体的事。' },
    { id: 'pack', title: '一稿多投硬约束', text: '同一份事实，五个渠道各写各的：小红书用三段图文，视频号用前三秒口播，抖音用一句反差，朋友圈用第一人称且不带 #，私聊分成开场、破冰、给价值、给选择、收尾，并保留 {昵称} 和 {学段}。不许虚构素材里没有的承诺。' },
    { id: 'grade', title: '学段口径', text: '幼儿写安心和画面；小学低年级写陪伴和一件小事；小学高年级写方法和节奏；初中尊重学生自己的判断；高中把选择说清楚。任何学段都不晒分、不评比孩子、不承诺录取。' },
    { id: 'funnel', title: '漏斗五环', text: '先定这条内容服务哪一环：内容运营是持续产出；引流把新人带到公开入口；续养/续费让在读家庭看见收获；年信是年度问候；报名转化只讲适合谁和下一步。五环可以同一周都做，但一条稿只走一环。' },
    { id: 'privacy', title: '隐私底线', text: '不写成绩排名，不拍身份证、准考证、手机号和家庭住址。未成年人出镜需监护人同意，不同意就拍背影、手和作品。' },
    { id: 'cover', title: '封面三秒', text: '3:4 竖版。主标题两行内读完。学段、事项、漏斗环节至少出现两样。不放分数和未授权特写。提示词里写明：不画可识别的未成年人正脸。' },
    { id: 'script', title: '口播节奏', text: '0 到 3 秒必须出现具体的事。大约每 8 到 12 秒一个新信息。家长的原问题比形容词有用。结尾一个轻问题，不伪造热度，不抽奖。' },
    { id: 'ship', title: '发布前核对', text: '复制标题正文话题后，打开平台创作页，人工粘贴并自己点发布。工作台不登录、不代填、不回报发布成功。内容审核没看过的稿先别发。' },
    { id: 'moments', title: '朋友圈不带话题', text: '朋友圈用「我」来写，80 到 150 字，不要 #。适合谁和下一步写清楚，情绪落在对家长或学生的说明，不落在比较。' },
    { id: 'dm', title: '私聊占位符', text: '话术里保留 {昵称} 和 {学段}。发送前再替换。不要在模板里写真实姓名、电话和住址，也不要写内部价。' }
  ];

  var CHECKS = [
    ['review', '运营负责人或内容审核已经看过'],
    ['sensitive', '没有成绩、身份证、手机号、家庭住址和未授权肖像'],
    ['consent', '出镜已获监护人同意，或已改成背影、作品、打码'],
    ['facts', '时间、名额、价格和机构官方通知一致'],
    ['claim', '没有保过、保录取、内部名额等无法兑现的承诺'],
    ['human', '我知道要自己到平台里点发布，本页不会代发']
  ];

  var EXAMPLES = [
    { label: '幼儿开放日', topic: '幼儿开放日，家长会问的三件事', grade: 'you', goal: 'acq' },
    { label: '低年级阅读', topic: '一年级阅读习惯，给家长的一张卡', grade: 'pl', goal: 'ops' },
    { label: '高年级阶段小结', topic: '四年级自主学习周的阶段小结', grade: 'ph', goal: 'keep' },
    { label: '初中体验课', topic: '初中体验课，适合谁来', grade: 'ms', goal: 'enroll' },
    { label: '高中选科咨询', topic: '高中选科咨询说明', grade: 'hs', goal: 'ops' },
    { label: '在读家庭年信', topic: '给在读家庭的新年信', grade: 'pl', goal: 'year' }
  ];

  function gradeById(id) {
    for (var i = 0; i < GRADES.length; i++) if (GRADES[i].id === id) return GRADES[i];
    return GRADES[1];
  }

  function goalById(id) {
    for (var i = 0; i < FUNNELS.length; i++) if (FUNNELS[i].id === id) return FUNNELS[i];
    return FUNNELS[0];
  }

  function clampChars(s, n) {
    var a = Array.from(String(s || ''));
    if (a.length <= n) return a.join('');
    return a.slice(0, Math.max(0, n - 1)).join('') + '…';
  }

  function charLen(s) {
    return Array.from(String(s || '')).length;
  }

  function fitRange(s, min, max) {
    var out = String(s || '');
    var filler = '时间名额以机构官方通知为准。';
    var guard = 0;
    while (charLen(out) < min && guard < 12) {
      out += filler;
      guard++;
    }
    if (charLen(out) > max) {
      var arr = Array.from(out);
      out = arr.slice(0, Math.max(0, max - 1)).join('') + '。';
      if (charLen(out) > max) out = arr.slice(0, max).join('');
    }
    return out;
  }

  function sentencesOf(text) {
    var raw = String(text || '').replace(/【演示占位，未抓取链接】/g, '');
    return raw.split(/[。！？\n]/).map(function (s) { return s.trim(); }).filter(function (s) { return s.length >= 8; }).slice(0, 3).map(function (s) { return clampChars(s, 42); });
  }

  function firstSentence(text, title) {
    var list = sentencesOf(text);
    if (list.length) return list[0];
    if (title && String(title).trim()) return clampChars(String(title).trim(), 42);
    return '先把一件家长和学生能看懂的小事写清楚';
  }

  function topicOf(title, content) {
    var t = String(title || '').trim();
    if (!t) t = firstSentence(content, '');
    t = t.replace(/^【演示】/, '').trim();
    return clampChars(t || 'K12选题', 28);
  }

  function tagsFor(ctx) {
    var base = (ctx.topic || 'K12选题').replace(/[#\s]/g, '');
    base = clampChars(base, 12) || 'K12选题';
    var pool = ['#K12', '#' + ctx.grade.label, '#' + ctx.goal.tag, '#' + base, '#家长沟通', '#学生内容', '#报名季', '#内容日历'];
    var out = [];
    pool.forEach(function (t) {
      if (out.indexOf(t) === -1) out.push(t);
    });
    return out.slice(0, 4).join(' ');
  }

  function makeCtx(input) {
    input = input || {};
    var grade = gradeById(input.grade);
    var goal = goalById(input.goal);
    var title = input.title || '';
    var content = input.content || '';
    var topic = topicOf(title, content);
    var sents = sentencesOf(content);
    return {
      grade: grade,
      goal: goal,
      topic: topic,
      sentence: sents[0] || firstSentence(content, title),
      extra: sents[1] || '',
      brand: (input.brand || '').trim() || '本项目',
      voice: clampChars((input.voice || '').trim(), 40),
      audience: grade.audience,
      tone: grade.tone,
      avoid: grade.avoid
    };
  }

  function makeXhs(ctx) {
    var voiceLine = ctx.voice ? ('记录时的口吻：' + ctx.voice + '。') : '口吻具体、清楚，像在跟家长把一件事说完。';
    var mid = ctx.extra
      ? ('素材里的下一句也可以用：「' + ctx.extra + '」。')
      : '把「适合谁、现场发生了什么、家庭下一步可以做什么」分成三小段，每段只留一个信息。';
    var body = [
      '图文笔记｜先把一件具体的事讲给家长和学生听，不写无法兑现的承诺。',
      '',
      ctx.grade.label + '的「' + ctx.topic + '」，这条走「' + ctx.goal.label + '」。' + ctx.brand + '想让' + ctx.audience + '看见：' + ctx.sentence + '。',
      '',
      '❶ 开场只留一个细节',
      '第一句不要写「大家好」。可写进正文的原句是：「' + ctx.sentence + '」。这一学段的语气是' + ctx.tone + '。',
      '',
      '❷ 中间写给谁看、发生了什么、下一步',
      mid,
      '这一环在做的是：' + ctx.goal.blurb + '。',
      '',
      '❸ 落在漏斗这一环，不落在比较',
      ctx.goal.tone + '。' + ctx.avoid + '。' + ctx.goal.avoid + '。',
      '给家长和学生的三行，时间名额一律以机构官方通知为准：',
      '· 适合谁',
      '· 能看见的一个变化或一场活动',
      '· 下一步是什么，只写已经公开的时间',
      '',
      voiceLine,
      '评论区留一个真实问题就好，不用打卡，也不用互赞。发布前请内容审核看一遍。这里只是草稿，不会替你发到平台。'
    ].join('\n');
    return {
      title: clampChars('📌' + ctx.grade.label + ctx.topic.replace(/\s/g, ''), 20),
      body: fitRange(body, 300, 600),
      tags: tagsFor(ctx),
      coverLine: clampChars(ctx.topic, 14),
      hint: '标题控制在 20 字内，正文走三段，另外准备 4 个话题。'
    };
  }

  function makeSph(ctx) {
    var body = '口播先听这句：如果只给你三秒，我会先说「' + ctx.topic + '」里家长真正会问的那一件。' +
      ctx.sentence + '。' + ctx.grade.label + '，说给' + ctx.audience + '。这条是「' + ctx.goal.label + '」。' +
      ctx.goal.tone + '。' + ctx.avoid + '。说完就停，不伪造热度。';
    var title = ctx.grade.label + '｜' + ctx.topic + '口播';
    if (charLen(title) < 16) title += '·写给家长和学生看';
    if (charLen(title) > 30) title = clampChars(title, 30);
    return {
      title: title,
      body: fitRange(body, 100, 200),
      tags: tagsFor(ctx).split(' ').slice(0, 2).join(' '),
      hook: '前3秒：' + clampChars(ctx.sentence, 28),
      coverLine: clampChars(ctx.topic, 14),
      hint: '先念钩子，再补两句口语。控制在一百到两百字。'
    };
  }

  function makeDy(ctx) {
    var body = '反差就一句：别人堆卖点，我们把「' + clampChars(ctx.topic, 12) + '」里最具体的一秒讲完。' +
      ctx.grade.label + '，' + ctx.audience + '也能看懂。' + ctx.avoid + '。评论留一个真实问题，不抽奖。';
    return {
      title: clampChars('别划｜' + ctx.grade.label + ctx.topic + '的一秒', 45),
      body: clampChars(body, 120),
      tags: tagsFor(ctx).split(' ').slice(0, 3).join(' '),
      hook: '开场反差：卖点对上一个具体细节',
      coverLine: clampChars(ctx.topic, 12),
      hint: '短描述不超过 120 字，靠反差而不是堆信息。'
    };
  }

  function makeMoments(ctx) {
    var body = '今天不发空海报，只把「' + clampChars(ctx.topic, 16) + '」讲给' + ctx.audience + '。' +
      clampChars(ctx.sentence, 28) + '。这条是「' + ctx.goal.label + '」：' + ctx.goal.tone + '。' +
      ctx.avoid + '。转发时写清适合谁，时间名额以官方通知为准。';
    body = body.replace(/#/g, '');
    return {
      title: '',
      body: fitRange(body, 80, 150).replace(/#/g, ''),
      tags: '',
      coverLine: '',
      hint: '第一人称，80–150 字，不要加 # 话题。'
    };
  }

  function makeDm(ctx) {
    var steps = [
      { role: '开场', text: '{昵称}你好，我是' + ctx.brand + '的内容运营。想跟你说一件{学段}的事：「' + ctx.topic + '」。' },
      { role: '破冰', text: '先不用回复很长。{昵称}只要告诉我，{学段}家里最近最关心的一个问题是什么。' },
      { role: '给价值', text: '我会按「' + ctx.goal.label + '」写成三行：适合谁、能得到什么、时间名额以机构官方通知为准。现场是这句：' + ctx.sentence + '。不承诺结果。' },
      { role: '给选择', text: '{昵称}更希望看图文、短视频，还是一段朋友圈？{学段}的说法我们按这一学段来写。' },
      { role: '收尾', text: '发出去之前会请审核看过。如果要出镜，需要监护人点头；不同意就拍背影和作品。{昵称}，你先忙。' }
    ];
    return {
      title: '私聊话术｜' + clampChars(ctx.topic, 18),
      body: steps.map(function (s) { return s.role + '：' + s.text; }).join('\n\n'),
      tags: '',
      steps: steps,
      coverLine: '',
      hint: '五步话术。发送前替换 {昵称} 和 {学段}，不要提前写成真实姓名。'
    };
  }

  var MAKERS = { xhs: makeXhs, sph: makeSph, dy: makeDy, moments: makeMoments, dm: makeDm };

  function buildPack(input) {
    var targets = (input.targets && input.targets.length) ? input.targets.slice() : TARGETS.map(function (t) { return t.id; });
    var ctx = makeCtx(input);
    var pack = {};
    targets.forEach(function (id) {
      if (!MAKERS[id]) return;
      pack[id] = MAKERS[id](ctx);
      pack[id].id = id;
    });
    return { ctx: ctx, pack: pack, audit: auditPack(pack) };
  }

  function auditPack(pack) {
    var ids = Object.keys(pack || {});
    var issues = [];
    if (!ids.length) issues.push('没有渠道');
    var bodies = ids.map(function (id) { return pack[id].body || ''; });
    if (new Set(bodies).size !== bodies.length) issues.push('有渠道正文完全相同');
    var heads = ids.map(function (id) { return Array.from(pack[id].body || '').slice(0, 20).join(''); });
    if (new Set(heads).size !== heads.length) issues.push('有渠道开头过于相似');
    if (pack.dm) {
      if (!pack.dm.steps || pack.dm.steps.length < 3) issues.push('私聊不足 3 条');
      if (pack.dm.body.indexOf('{昵称}') < 0 || pack.dm.body.indexOf('{学段}') < 0) issues.push('私聊缺少占位符');
    }
    if (pack.moments && pack.moments.body.indexOf('#') >= 0) issues.push('朋友圈带了话题符号');
    if (pack.xhs && charLen(pack.xhs.title) > 20) issues.push('小红书标题超过 20 字');
    if (pack.xhs && (charLen(pack.xhs.body) < 300 || charLen(pack.xhs.body) > 600)) issues.push('小红书正文不在 300–600 字');
    if (pack.dy && charLen(pack.dy.body) > 120) issues.push('抖音正文超过 120 字');
    if (pack.sph) {
      var titleLen = charLen(pack.sph.title);
      var bodyLen = charLen(pack.sph.body);
      if (titleLen < 16 || titleLen > 30) issues.push('视频号标题不在 16–30 字');
      if (bodyLen < 100 || bodyLen > 200) issues.push('视频号正文不在 100–200 字');
    }
    if (pack.moments) {
      var mlen = charLen(pack.moments.body);
      if (mlen < 80 || mlen > 150) issues.push('朋友圈不在 80–150 字');
    }
    if (pack.xhs && pack.xhs.tags.split(' ').filter(Boolean).length < 4) issues.push('小红书话题不足 4 个');
    return { ok: issues.length === 0, issues: issues };
  }

  function scanText(text, extraWords) {
    var src = String(text || '');
    var hits = [];
    var seen = {};
    LEXICON.forEach(function (item) {
      if (src.indexOf(item.w) >= 0 && !seen[item.w]) {
        seen[item.w] = 1;
        hits.push({ w: item.w, level: item.level, from: '词库' });
      }
    });
    (extraWords || []).forEach(function (w) {
      w = String(w || '').trim();
      if (!w || seen[w]) return;
      if (src.indexOf(w) >= 0) {
        seen[w] = 1;
        hits.push({ w: w, level: 'mid', from: '自添' });
      }
    });
    var risk = 'low';
    if (hits.some(function (h) { return h.level === 'high'; })) risk = 'high';
    else if (hits.length) risk = 'mid';
    return { risk: risk, hits: hits };
  }

  function safeDecode(s) {
    try { return decodeURIComponent(s); } catch (e) { return s; }
  }

  function sniffKeyword(text) {
    var t = safeDecode(String(text || ''));
    for (var i = 0; i < KEYWORDS.length; i++) {
      if (t.indexOf(KEYWORDS[i]) >= 0) return KEYWORDS[i];
    }
    return '';
  }

  function detectPlatform(url) {
    var u = String(url || '');
    for (var i = 0; i < LINK_RULES.length; i++) {
      if (LINK_RULES[i][1].test(u)) return LINK_RULES[i][0];
    }
    return '';
  }

  var LINK_RULES = [
    ['小红书', /xiaohongshu\.com|xhslink\.com|xhs\.cn/i],
    ['公众号', /mp\.weixin\.qq\.com|weixin\.qq\.com\/s\//i],
    ['抖音', /douyin\.com|iesdouyin\.com/i],
    ['视频号', /channels\.weixin\.qq\.com|finder\.video|weixin\.qq\.com\/sph/i],
    ['B站', /bilibili\.com|b23\.tv/i],
    ['快手', /kuaishou\.com|gifshow\.com|chenzhongtech\.com/i]
  ];

  function parseDemo(url) {
    var raw = String(url || '').trim();
    var platform = detectPlatform(raw);
    var kw = sniffKeyword(raw);
    var known = !!platform;
    if (!platform) platform = '未识别';
    var scene = DEMO_SCENE[kw] || '一条给家长和学生看的内容：把适合谁、发生了什么、下一步讲清楚。可以按学段改写成小红书、短视频或私聊。';
    var title = (kw ? kw + '选题' : 'K12内容选题');
    if (platform !== '未识别') title = '【演示】' + platform + '·' + title;
    else title = '【演示】' + title;
    var content = '【演示占位，未抓取链接】\n' + scene + '\n平台猜测仅根据网址关键词，正文是运营场景占位，请换成你的真实素材后再生成和发布。';
    return {
      demo: true,
      ok: true,
      platform: platform,
      known: known,
      keyword: kw || 'K12内容',
      title: title,
      author: '演示解析 · 非真实作者',
      content: content,
      images: ['配图位 1（演示，未下载）', '配图位 2（演示，未下载）', '配图位 3（演示，未下载）'],
      note: known
        ? ('演示解析 · 未访问链接 · 平台猜测：' + platform + ' · 选题猜测：' + (kw || 'K12内容'))
        : '演示解析 · 这条链接不像小红书 / 公众号 / 抖音 / 视频号 / B站 / 快手，下面仍是占位文案，请改平台并粘贴真实正文。'
    };
  }

  function filterLow(query) {
    var q = query || {};
    var maxFans = q.maxFans == null ? 5000 : Number(q.maxFans);
    var minAct = q.minAct == null ? 0 : Number(q.minAct);
    var grade = q.grade || 'all';
    var goal = q.goal || 'all';
    var kw = q.kw || '';
    var text = (q.text || '').trim();
    return LOW.filter(function (it) {
      var act = it.like + it.save + it.comment;
      if (maxFans > 0 && it.fans > maxFans) return false;
      if (act < minAct) return false;
      if (grade !== 'all' && it.grade !== grade) return false;
      if (goal !== 'all' && it.goal !== goal) return false;
      if (kw && it.kw !== kw) return false;
      if (text && (it.title + it.author + it.blurb + it.kw).indexOf(text) < 0) return false;
      return true;
    }).sort(function (a, b) {
      return (b.like + b.save + b.comment) - (a.like + a.save + a.comment);
    });
  }

  function filterHot(column, query) {
    var q = query || {};
    var list = HOT[column] || [];
    var text = (q.text || '').trim();
    var grade = q.grade || 'all';
    var goal = q.goal || 'all';
    return list.filter(function (it) {
      if (grade !== 'all' && it.grades.indexOf(grade) < 0) return false;
      if (goal !== 'all' && it.goal !== goal) return false;
      if (text && (it.title + it.sub + it.blurb).indexOf(text) < 0) return false;
      return true;
    });
  }

  function weekPlan(gradeId, theme) {
    var seeds = SEEDS[gradeId] || SEEDS.pl;
    var prefix = String(theme || '').trim();
    return WEEK_META.map(function (meta, i) {
      var seed = seeds[i];
      return {
        day: meta[0],
        slot: meta[1],
        angle: meta[2],
        goal: meta[3],
        title: prefix ? (prefix + ' · ' + seed) : seed,
        topic: prefix ? (prefix + '（' + meta[0] + '：' + seed + '）') : seed
      };
    });
  }

  function outlineFor(input) {
    var ctx = makeCtx(input || {});
    var line = (input && input.coverTitle) ? clampChars(input.coverTitle, 14) : clampChars(ctx.topic, 14);
    if (!line) line = clampChars(ctx.topic, 14);
    var common = '扁平教育插画，奶油色背景，窗光，书本、书包和作品局部，家长与孩子的背影或剪影。不要可识别的未成年人正脸，不要成绩单，不要仿冒校徽。比例 3:4。';
    return [
      { type: '封面', title: line, text: ctx.grade.label + ' · ' + ctx.goal.label + ' · ' + ctx.brand + '。竖版只放这一句大字。', prompt: common + '画面大字：「' + line + '」。' },
      { type: '内容', title: '一个能看懂的细节', text: ctx.sentence, prompt: common + '画面是一个具体动作或一份作品，大字不挡脸。配文：' + clampChars(ctx.sentence, 24) + '。' },
      { type: '内容', title: '适合谁 / 发生了什么 / 下一步', text: '三段各留一个信息。这一环是' + ctx.goal.label + '：' + ctx.goal.blurb + '。', prompt: common + '三格小构图，分别是适合谁、现场、下一步，颜色克制。' },
      { type: '内容', title: '给家长和学生的三行', text: '适合谁；能得到什么；时间名额以机构官方通知为准。', prompt: common + '像一张可转发的便签，字少，留白多。' },
      { type: '总结', title: '下一期只征集一个真实问题', text: '不打卡，不互赞，不伪造热度。' + ctx.avoid + '。', prompt: common + '结尾页大字：「下一期，一个真实问题就好」。' }
    ];
  }

  function lowKeywords() {
    var map = {};
    LOW.forEach(function (it) { map[it.kw] = 1; });
    return Object.keys(map);
  }

  return {
    GRADES: GRADES,
    FUNNELS: FUNNELS,
    PLATFORMS: PLATFORMS,
    TARGETS: TARGETS,
    COMPOSE: COMPOSE,
    LEXICON: LEXICON,
    HOT: HOT,
    LOW: LOW,
    SEEDS: SEEDS,
    SKILLS: SKILLS,
    CHECKS: CHECKS,
    EXAMPLES: EXAMPLES,
    gradeById: gradeById,
    goalById: goalById,
    clampChars: clampChars,
    charLen: charLen,
    buildPack: buildPack,
    auditPack: auditPack,
    scanText: scanText,
    parseDemo: parseDemo,
    detectPlatform: detectPlatform,
    filterLow: filterLow,
    filterHot: filterHot,
    weekPlan: weekPlan,
    outlineFor: outlineFor,
    lowKeywords: lowKeywords
  };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = BJCM;
