/* 北京高中班级新媒体工作台 · 纯前端逻辑（无接口） */
var BJCM = (function () {
  var GRADES = [
    { id: 'xin', label: '新高一', audience: '新生和家长', tone: '安心、具体、少术语', avoid: '不比谁吃苦，不公开分班结果' },
    { id: 'g1', label: '高一', audience: '高一同学和家长', tone: '轻松但具体，像班刊', avoid: '不把社团写成广告，不拉票' },
    { id: 'g2', label: '高二', audience: '面临选科的学生和家长', tone: '把选择讲清楚，不制造焦虑', avoid: '不承诺能选对，不比较班级' },
    { id: 'g3', label: '高三', audience: '高三同学和家长', tone: '短、稳、帮人喘口气', avoid: '不晒分数，不倒计时恐吓，不传小道消息' }
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
      step: '把 {昵称} 和 {年级} 换成真实称呼后再发送。工作台不会打开聊天窗口，也不会代发。'
    }
  };

  var LEXICON = [
    { w: '泄题', level: 'high' },
    { w: '考题答案', level: 'high' },
    { w: '作弊', level: 'high' },
    { w: '代考', level: 'high' },
    { w: '包过', level: 'high' },
    { w: '保过', level: 'high' },
    { w: '内部名额', level: 'high' },
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
    { w: '押题', level: 'mid' }
  ];

  var KEYWORDS = ['军训', '家长会', '选科', '一模', '二模', '运动会', '社团', '报到', '成人礼', '志愿', '合格考', '期末', '值日', '晨读', '公约'];

  var DEMO_SCENE = {
    '军训': '军训间隙，水壶在地上排成一排，有人把旁边同学的瓶盖拧紧。教官口令停下来的那几秒，班里比列队时更齐。',
    '家长会': '家长会散场后，走廊里椅子被一张张塞回去。同学说，最想让家长知道的不是名次，而是这周谁帮谁讲了一道题。',
    '选科': '选科说明会结束后，同桌先问「你怎么想」，表格还没发下来。班主任把问题收成三问：兴趣、作息、愿不愿意问老师。',
    '一模': '一模成绩单没有贴出来。后门上是一张加油站便签：今晚早点睡，明天照常值日。',
    '二模': '二模周的午休，教室灯关了一半。有人把计时器扣过去，班长只说了一句「别互相报分」。',
    '运动会': '入场式后台，有人跪在地上别班旗的别针。没上场的同学在发号牌，这个镜头比主席台更像我们班。',
    '社团': '招新摊位前只有三十秒。讲清楚集合时间和是否需要自备材料就够了，不替社团做广告，也不拉票。',
    '报到': '报到当天从校门到教室，新生家长最常问的是饮水处和卫生间。班级把路线写成一张可以转发的清单。',
    '成人礼': '彩排时大家记的是一个走位，不是服装好不好看。合影前先问过谁不愿意露脸。',
    '志愿': '志愿沟通从一句「你自己更想留在哪一段生活」开始，老师不替学生填表，家长会只同步时间。',
    '合格考': '合格考前的晚自习很安静，没有倒计时海报。班委把第二天的集合时间写在黑板角上。',
    '期末': '期末前一周，后门便签写着三件可以帮忙的小事：借笔记、占座、提醒带文具。',
    '值日': '高考周的值日表还贴在门后，擦黑板的人照旧。班级记录想留下的是这件事还在。',
    '晨读': '晨读最整齐的一分钟，出现在没人喊口号的时候。录音只留给班里，不公开到校外。',
    '公约': '班级公约起草时，每个人改一个词。写上去之前先读出声，看是不是在指责某一个同学。'
  };

  var LINK_RULES = [
    ['小红书', /xiaohongshu\.com|xhslink\.com|xhs\.cn/i],
    ['公众号', /mp\.weixin\.qq\.com|weixin\.qq\.com\/s\//i],
    ['抖音', /douyin\.com|iesdouyin\.com/i],
    ['视频号', /channels\.weixin\.qq\.com|finder\.video|weixin\.qq\.com\/sph/i],
    ['B站', /bilibili\.com|b23\.tv/i],
    ['快手', /kuaishou\.com|gifshow\.com|chenzhongtech\.com/i]
  ];

  var HOT = {
    xhs: [
      { title: '军训第一周，水壶比口号先整齐', hot: '演示热度 92', sub: '新高一 · 图文', grades: ['xin', 'g1'], blurb: '把镜头放在休息的十秒，而不是口号。适合做班级记录，不比谁更能扛。' },
      { title: '家长会后的走廊，只留三件事', hot: '演示热度 88', sub: '高一 · 家校', grades: ['xin', 'g1', 'g2'], blurb: '散场后的椅子、一句原话、一张可转发清单。不写成绩。' },
      { title: '社团招新三十秒，不替摊位做广告', hot: '演示热度 76', sub: '高一高二', grades: ['g1', 'g2'], blurb: '讲清楚时间和材料，热闹可以，导流不行。' },
      { title: '运动会幕后：别针、号牌、没上场的人', hot: '演示热度 84', sub: '全年级', grades: ['xin', 'g1', 'g2', 'g3'], blurb: '后台比主席台更像一个班。出镜先问同意。' },
      { title: '选科说明会，家长问得最多的三题', hot: '演示热度 90', sub: '高一末到高二', grades: ['g1', 'g2'], blurb: '只整理问题和沟通方式，不给保分建议。' },
      { title: '后门便签：今晚早点睡', hot: '演示热度 81', sub: '高三 · 加油站', grades: ['g3'], blurb: '减压用具体小事，不用倒计时恐吓，不晒分。' },
      { title: '报到日的校园地图', hot: '演示热度 73', sub: '新高一', grades: ['xin'], blurb: '从校门到教室，家长真正会转发的是路线和集合点。' },
      { title: '成人礼彩排，记住一个走位', hot: '演示热度 69', sub: '高三', grades: ['g3'], blurb: '记录流程，不评价外表，合影前确认谁不露脸。' }
    ],
    dy: [
      { title: '别划，军训安静的那一秒', hot: '演示热度 86', sub: '15–30 秒', grades: ['xin', 'g1'], blurb: '第一帧就给具体动作。字幕短，不放成绩条。' },
      { title: '家长会后同学想说的三句', hot: '演示热度 83', sub: '口播', grades: ['g1', 'g2'], blurb: '用同学原话，不用旁白鸡汤。' },
      { title: '入场式后台更好拍', hot: '演示热度 79', sub: '运动会', grades: ['xin', 'g1', 'g2', 'g3'], blurb: '竖屏跟着别针和号牌走，结尾问下一期拍哪。' },
      { title: '选科周，先别急着下结论', hot: '演示热度 77', sub: '高二', grades: ['g1', 'g2'], blurb: '反差是：表格还没来，问题先来了。' },
      { title: '一模后，班里不晒分', hot: '演示热度 91', sub: '高三', grades: ['g3'], blurb: '画面给便签和值日表，不给分数截图。' },
      { title: '期末前的后门便签', hot: '演示热度 74', sub: '高一高二', grades: ['g1', 'g2'], blurb: '三件可以帮忙的小事，做成字幕清单。' },
      { title: '招新摊位的真实三十秒', hot: '演示热度 70', sub: '校园', grades: ['g1', 'g2'], blurb: '人声可以在，推销腔不要有。' },
      { title: '高考周，值日表还在', hot: '演示热度 88', sub: '留档', grades: ['g3'], blurb: '生活还在继续。不直播考场，不传小道消息。' }
    ],
    sph: [
      { title: '给家长：第一次家长会的三行', hot: '演示热度 85', sub: '视频号 · 家校', grades: ['xin', 'g1'], blurb: '时间、配合事项、以班主任通知为准。称呼克制。' },
      { title: '新高一报到，路线可以转发', hot: '演示热度 72', sub: '新生', grades: ['xin'], blurb: '适合家长转进家庭群，不收集电话号码。' },
      { title: '运动会后勤，拍给家长看', hot: '演示热度 75', sub: '现场', grades: ['xin', 'g1', 'g2', 'g3'], blurb: '三件事说完就停，不拉关注。' },
      { title: '期中沟通：少报分，多说状态', hot: '演示热度 80', sub: '家校', grades: ['g1', 'g2', 'g3'], blurb: '讲作息和互助，不念排名。' },
      { title: '合格考周的安静晚自习', hot: '演示热度 68', sub: '高二', grades: ['g2'], blurb: '减压记录。不渲染焦虑，不泄题。' },
      { title: '志愿怎么开口', hot: '演示热度 78', sub: '高三', grades: ['g3'], blurb: '老师不代填。视频只演示沟通顺序。' },
      { title: '班级公约写上墙之前', hot: '演示热度 66', sub: '高一', grades: ['g1'], blurb: '读出声，避免写成指责某一个人。' },
      { title: '晨读最整齐的一分钟', hot: '演示热度 71', sub: '班级', grades: ['xin', 'g1', 'g2'], blurb: '给家长看状态，不公开录音原文件。' }
    ],
    mp: [
      { title: '【新高一】入学第一封说明', hot: '演示热度 82', sub: '可留存', grades: ['xin'], blurb: '小标题写路线、携带物品、肖像授权。集合点以通知为准。' },
      { title: '【高一】期中家长会观察', hot: '演示热度 77', sub: '班刊体', grades: ['g1'], blurb: '写成可回看的记录，不写「震惊」「必看」。' },
      { title: '【高二】选科沟通记录', hot: '演示热度 89', sub: '说明', grades: ['g1', 'g2'], blurb: '三问结构。明确写：本文不提供保分建议。' },
      { title: '【高三】一模之后的班级复盘', hot: '演示热度 93', sub: '加油站', grades: ['g3'], blurb: '方法与互助。不贴分数，不点名。' },
      { title: '运动会特刊：没上场的同学', hot: '演示热度 74', sub: '特刊', grades: ['xin', 'g1', 'g2', 'g3'], blurb: '后勤、号牌、班旗。一篇可以年底再翻的稿。' },
      { title: '班级新媒体投稿约定', hot: '演示热度 64', sub: '制度', grades: ['xin', 'g1', 'g2', 'g3'], blurb: '一张图、一句话、是否同意出镜。老师发布前再看。' },
      { title: '成人礼周记', hot: '演示热度 70', sub: '高三', grades: ['g3'], blurb: '写走位和一句寄语，不评比服装。' },
      { title: '期末前给家长的转发清单', hot: '演示热度 76', sub: '清单', grades: ['g1', 'g2'], blurb: '三行就够。高三请改用加油站口径。' }
    ]
  };

  var LOW = [
    ['军训水壶与站姿', '新高一班刊', 420, 8600, 2400, 310, 'xin', '军训', '小红书', '休息时把水壶排齐，比拍口号更像这个班。'],
    ['报到路线一张图', '校门观察', 180, 3200, 1500, 96, 'xin', '报到', '公众号', '从校门到教室的清单，家长会转发。'],
    ['第一句班规', '走廊记录员', 860, 5400, 980, 240, 'xin', '公约', '视频号', '班规写的是互相提醒，不是点名批评。'],
    ['宿舍安顿的一张床', '新生联络', 95, 2100, 640, 88, 'xin', '报到', '小红书', '只拍床铺和姓名贴的一角，不拍证件。'],
    ['家长会后的三件事', '高一3班记录', 2600, 12000, 4300, 860, 'g1', '家长会', '小红书', '散场走廊。同学想让家长知道的是互助，不是名次。'],
    ['社团招新不拉票', '摊位侧记', 740, 6800, 1900, 410, 'g1', '社团', '抖音', '三十秒讲完时间地点，不做广告。'],
    ['晨读安静的一分钟', '高一班刊', 1500, 4100, 860, 120, 'g1', '晨读', '视频号', '没有人喊口号的那一分钟。'],
    ['运动会别针', '入场式后勤', 390, 15600, 5200, 940, 'g1', '运动会', '小红书', '没上场的同学在发号牌。粉丝不多，收藏很高。'],
    ['班级公约改一个词', '墙报组', 610, 2300, 770, 64, 'g1', '公约', '公众号', '读出声再写上墙。'],
    ['选科三问', '高二笔记', 4800, 22000, 9100, 1600, 'g2', '选科', '小红书', '兴趣、作息、愿不愿意问老师。不给保证。'],
    ['课表变了之后', '课表观察', 2100, 3600, 1400, 210, 'g2', '选科', '公众号', '确定后的第一周，写状态不写排名。'],
    ['合格考前的灯', '晚自习记录', 880, 9700, 2600, 530, 'g2', '合格考', '抖音', '灯还亮着，没有倒计时海报。'],
    ['同伴答疑角', '高二答疑角', 340, 4500, 1800, 260, 'g2', '选科', '视频号', '一个文件夹交接社团骨干。'],
    ['家长会少报分', '家校同频', 3200, 6400, 2100, 300, 'g2', '家长会', '视频号', '多说作息和睡眠，少念数字。'],
    ['后门加油站便签', '高三便签', 560, 18800, 7600, 1200, 'g3', '一模', '小红书', '今晚早点睡，明天照常值日。'],
    ['不晒分复盘', '高三班刊', 4100, 9800, 3400, 640, 'g3', '一模', '公众号', '复盘方法，不贴成绩单。'],
    ['二模周午休', '计时器扣过去', 270, 5200, 1600, 190, 'g3', '二模', '抖音', '有人把计时器扣过去，班长说别互相报分。'],
    ['志愿沟通的第一句', '升学联络', 1900, 7300, 2500, 480, 'g3', '志愿', '视频号', '从「你想留在哪一段生活」开口。'],
    ['成人礼一个走位', '彩排侧记', 640, 2800, 900, 150, 'g3', '成人礼', '小红书', '记走位，不评服装。'],
    ['高考周值日仍在', '门后值日表', 120, 24000, 11000, 860, 'g3', '值日', '小红书', '粉丝很少，互动很高。画面只有值日表和黑板擦。'],
    ['期末三件小事', '高二期末', 4500, 3900, 1200, 140, 'g2', '期末', '小红书', '借笔记、占座、提醒文具。'],
    ['入场式号牌', '高三后勤', 980, 6100, 2000, 270, 'g3', '运动会', '抖音', '号牌发完，人才站齐。'],
    ['新生家庭群不收电话', '新高一联络', 70, 890, 420, 36, 'xin', '报到', '公众号', '路线可以发，电话和住址不要发。'],
    ['选科表发下来之前', '同桌问一句', 5300, 4100, 980, 220, 'g2', '选科', '小红书', '表格还没到，问题先到了。'],
    ['班旗还没做好', '新高一手记', 250, 1600, 540, 48, 'xin', '军训', '视频号', '先用一张纸写班名，也算仪式。'],
    ['冬日晨读', '高一窗边', 7600, 2100, 430, 55, 'g1', '晨读', '小红书', '粉丝过了五千，互动一般，用来对照低粉样本。'],
    ['作文墙不排名', '高二墙报', 14000, 1800, 260, 40, 'g2', '公约', '公众号', '高粉低互动，雷达里会被粉丝上限滤掉。'],
    ['模拟后的操场一圈', '高三散步', 300, 11200, 3900, 700, 'g3', '二模', '抖音', '走路，不讲话，不报分。']
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
      hue: (i * 47) % 360
    };
  });

  var SEEDS = {
    xin: ['报到那天的校园地图', '军训第一周的水壶与站姿', '记住同桌名字的方式', '班主任的第一句班规', '宿舍安顿的一张床', '给家长的入学说明', '班旗还没做好之前'],
    g1: ['社团招新摊位前的30秒', '第一次家长会后的走廊', '班级公约怎么写才有人听', '晨读最整齐的一分钟', '运动会入场式幕后', '期中前的班级加油站', '同学之间一次具体的互助'],
    g2: ['选科说明会上的三个问题', '选科确定后的第一周课表', '合格考前的安静晚自习', '社团骨干交接的文件夹', '家长会少报分多说状态', '同伴答疑角', '课表变了之后的班级感'],
    g3: ['一模之后不晒分的复盘', '二模倒计时里的午休', '教室后门的加油站便签', '班主任一句短而具体的话', '志愿沟通怎么开口', '成人礼彩排的一个走位', '高考周班级值日仍然在']
  };

  var WEEK_META = [
    ['周一', '开场', '用一个开场细节把人留住'],
    ['周二', '现场', '准备、发生、收住各一个镜头'],
    ['周三', '原话', '两位同学各一句原话'],
    ['周四', '家校', '给家长三行可转发说明'],
    ['周五', '反差', '预期和实际差一个小细节'],
    ['周六', '回看', '合影之外没拍到的事'],
    ['周日', '预告', '下周一可以拍的一个镜头']
  ];

  var SKILLS = [
    { id: 'hook', title: '选题钩子', text: '第一句写现场细节，不要写「大家好」。例如：军训那天全班最安静的一秒，出现在水壶放下的时候。标题里出现年级和具体的事。' },
    { id: 'pack', title: '一稿多投硬约束', text: '同一份事实，五个渠道各写各的：小红书用三段图文，视频号用前三秒口播，抖音用一句反差，朋友圈用第一人称且不带 #，私聊分成开场、破冰、给价值、给选择、收尾，并保留 {昵称} 和 {年级}。不许虚构素材里没有的承诺。' },
    { id: 'grade', title: '年级口径', text: '新高一写适应和路线；高一写班级文化；高二写选择和节奏；高三写减压和具体小事。任何年级都不晒分、不点名、不承诺结果。' },
    { id: 'home', title: '家校三行', text: '给家长只留三行：发生了什么、需要配合什么、时间地点以班主任通知为准。少用「最强」「顶级」「逆袭」。' },
    { id: 'privacy', title: '隐私底线', text: '不写成绩排名，不拍身份证、准考证、手机号和家庭住址。出镜需本人和家长同意，不同意就拍背影、手和班旗。' },
    { id: 'cover', title: '封面三秒', text: '3:4 竖版。主标题两行内读完。年级、班级、事情至少出现两样。不放分数和未授权特写。提示词里写明：不画可识别的未成年人正脸。' },
    { id: 'script', title: '口播节奏', text: '0 到 3 秒必须出现具体的事。大约每 8 到 12 秒一个新信息。同学原话比形容词有用。结尾一个轻问题，不求关注，不抽奖。' },
    { id: 'ship', title: '发布前核对', text: '复制标题正文话题后，打开平台创作页，人工粘贴并自己点发布。工作台不登录、不代填、不回报发布成功。老师未看过的稿先别发。' },
    { id: 'moments', title: '朋友圈不带话题', text: '朋友圈用「我」来写，80 到 150 字，不要 #。事实和给家长的配合事项写清楚，情绪落在班集体。' },
    { id: 'dm', title: '私聊占位符', text: '话术里保留 {昵称} 和 {年级}。发送前再替换。不要在模板里写真实姓名、电话和住址。' }
  ];

  var CHECKS = [
    ['review', '班主任或负责老师已经看过'],
    ['sensitive', '没有成绩、身份证、学号、电话、家庭住址'],
    ['consent', '出镜已获同意，或已改成背影、打码'],
    ['facts', '时间地点和班主任通知一致'],
    ['human', '我知道要自己到平台里点发布，本页不会代发']
  ];

  function gradeById(id) {
    for (var i = 0; i < GRADES.length; i++) if (GRADES[i].id === id) return GRADES[i];
    return GRADES[1];
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
    var filler = '时间地点以班主任通知为准。';
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

  function hashStr(s) {
    var n = 0;
    var a = Array.from(String(s || ''));
    for (var i = 0; i < a.length; i++) n = (n + a[i].codePointAt(0)) % 997;
    return n;
  }

function sentencesOf(text) {
  var raw = String(text || '').replace(/【演示占位，未抓取链接】/g, '');
  return raw.split(/[。！？\n]/).map(function (s) { return s.trim(); }).filter(function (s) { return s.length >= 8; }).slice(0, 3).map(function (s) { return clampChars(s, 42); });
}

function firstSentence(text, title) {
  var list = sentencesOf(text);
  if (list.length) return list[0];
  if (title && String(title).trim()) return clampChars(String(title).trim(), 42);
  return '教室里有一个很小、但大家都会记住的细节';
}

  function topicOf(title, content) {
    var t = String(title || '').trim();
    if (!t) t = firstSentence(content, '');
    t = t.replace(/^【演示】/, '').trim();
    return clampChars(t || '班级日常', 28);
  }

  function tagsFor(ctx, extras) {
    var base = (ctx.topic || '班级日常').replace(/[#\s]/g, '');
    base = clampChars(base, 12) || '班级日常';
    var pool = ['#北京高中', '#' + ctx.grade.label, '#' + base, '#班级记录', '#校园宣传', '#家校沟通', '#现场记录', '#班级日常'].concat(extras || []);
    var out = [];
    pool.forEach(function (t) {
      if (out.indexOf(t) === -1) out.push(t);
    });
    return out.slice(0, 4).join(' ');
  }

  function makeCtx(input) {
    var grade = gradeById(input.grade);
    var title = input.title || '';
    var content = input.content || '';
var topic = topicOf(title, content);
  var sents = sentencesOf(content);
  return {
    grade: grade,
    topic: topic,
    sentence: sents[0] || firstSentence(content, title),
    extra: sents[1] || '',
      cls: (input.className || '').trim() || 'X班',
      voice: clampChars((input.voice || '').trim(), 40),
      audience: grade.audience,
      tone: grade.tone,
      avoid: grade.avoid
    };
  }

  function makeXhs(ctx) {
    var voiceLine = ctx.voice ? ('记录时的口吻：' + ctx.voice + '。') : '口吻像班刊：具体、温暖，不鸡汤。';
    var body = [
      '图文笔记｜先把画面定在教室里，不写分数，也不写名次。',
      '',
      ctx.grade.label + '的「' + ctx.topic + '」，' + ctx.cls + '想留下的不是口号，而是一个能被看见的瞬间：' + ctx.sentence + '。',
      '',
      '❶ 开场只留一个细节',
      '把镜头给到动作和声音，第一句不要写「大家好」。可写进正文的原句是：「' + ctx.sentence + '」。这一阶段的语气是' + ctx.tone + '。',
      '',
      '❷ 中间写准备、发生、收住',
      (ctx.extra ? ('素材里的下一句也可以用：「' + ctx.extra + '」。') : '准备：谁在忙、忙的是哪一件具体的事，比如整队、对名单、把座位找到。'),
      '发生：有人一时没跟上，旁边的同学把步骤再指一遍。',
      '收住：班主任或同学的一句短话，比形容词更耐看。',
      '',
      '❸ 落在班集体，不落在比较',
      '这一阶段更在意：' + ctx.tone + '。' + ctx.avoid + '。',
      '给家长的三行，时间地点一律以班主任通知为准：',
      '· 这件事在说什么',
      '· 需要配合的通常只有授权和到场时间',
      '· 不公开成绩、学号和证件',
      '',
      voiceLine,
      '想被写进下一期的同学，评论区留一句现场就好，不用打卡，也不用互赞。发布前请老师看一遍。这里只是草稿，不会替你发到平台。'
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
    var body = '口播先听这句：如果只给你三秒，我会先说「' + ctx.topic + '」里那个没被拍到的动作。停一下。' +
      ctx.sentence + '。' + ctx.grade.label + '的' + ctx.audience + '听得懂就行，我们用口语把现场说完就停。第一，这件事和当下有关，语气是' +
      ctx.tone + '。第二，' + ctx.avoid + '。你希望下一期拍走廊、教室还是操场？说完就停，不引导关注。';
    var title = ctx.grade.label + '现场｜' + ctx.topic + '三秒口播';
    if (charLen(title) < 16) title += '·班级记录';
    return {
      title: clampChars(title, 30),
      body: fitRange(body, 100, 200),
      tags: tagsFor(ctx).split(' ').slice(0, 2).join(' '),
      hook: '前3秒：' + clampChars(ctx.sentence, 28),
      coverLine: clampChars(ctx.topic, 14),
      hint: '先念钩子，再补两句口语。控制在一百到两百字。'
    };
  }

  function makeDy(ctx) {
    var body = '反差就一句：别人拍热闹，我们拍「' + ctx.topic + '」里突然安静的那一秒。' +
      ctx.grade.label + '，' + ctx.audience + '也能看懂。' + ctx.avoid + '。评论留下一帧，不抽奖。';
    return {
      title: clampChars('别划｜' + ctx.grade.label + ctx.topic + '安静的一秒', 45),
      body: clampChars(body, 120),
      tags: tagsFor(ctx).split(' ').slice(0, 3).join(' '),
      hook: '开场反差：热闹对上突然安静',
      coverLine: clampChars(ctx.topic, 12),
      hint: '短描述不超过 120 字，靠反差而不是堆信息。'
    };
  }

  function makeMoments(ctx) {
    var body = '今天在班里，我没有发合影名单，只把「' + ctx.topic + '」记下来。' +
      ctx.sentence + '。想让' + ctx.audience + '看到的是：' + ctx.tone + '。' + ctx.avoid +
      '。如果要转发，带上发生了什么、需要配合什么，时间以班主任通知为准。';
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
      { role: '开场', text: '{昵称}你好，我是' + ctx.cls + '新媒体。想跟你说一件{年级}的小事：「' + ctx.topic + '」。' },
      { role: '破冰', text: '先不用回复很长。{昵称}只要告诉我，{年级}最近最想被同学看见的一个瞬间是什么。' },
      { role: '给价值', text: '我们会写成给家长看的三行：发生了什么、需要配合什么、时间以班主任通知为准。现场是这句：' + ctx.sentence + '。不写分数。' },
      { role: '给选择', text: '{昵称}更希望用图文、短视频，还是一段朋友圈？选一个就行。{年级}的口径我们按班里的习惯来写。' },
      { role: '收尾', text: '定稿前会请老师看过。{年级}如果要出镜，需要你和家长点头；不同意我们就拍背影。{昵称}，你先忙。' }
    ];
    return {
      title: '私聊话术｜' + clampChars(ctx.topic, 18),
      body: steps.map(function (s) { return s.role + '：' + s.text; }).join('\n\n'),
      tags: '',
      steps: steps,
      coverLine: '',
      hint: '五步话术。发送前替换 {昵称} 和 {年级}，不要提前写成真实姓名。'
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
      if (pack.dm.body.indexOf('{昵称}') < 0 || pack.dm.body.indexOf('{年级}') < 0) issues.push('私聊缺少占位符');
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

  function parseDemo(url) {
    var raw = String(url || '').trim();
    var platform = detectPlatform(raw);
    var kw = sniffKeyword(raw);
    var known = !!platform;
    if (!platform) platform = '未识别';
    var scene = DEMO_SCENE[kw] || '班级里发生了一件很小的事：有人把座位找对，有人把下一句通知写在黑板角上。适合写成给同学和家长看的记录。';
    var title = (kw ? kw + '现场' : '班级日常现场');
    if (platform !== '未识别') title = '【演示】' + platform + '·' + title;
    else title = '【演示】' + title;
    var content = '【演示占位，未抓取链接】\n' + scene + '\n平台猜测仅根据网址关键词，正文是校园场景占位，请换成你的真实素材后再生成和发布。';
    return {
      demo: true,
      ok: true,
      platform: platform,
      known: known,
      keyword: kw || '班级日常',
      title: title,
      author: '演示解析 · 非真实作者',
      content: content,
      images: ['配图位 1（演示，未下载）', '配图位 2（演示，未下载）', '配图位 3（演示，未下载）'],
      note: known
        ? ('演示解析 · 未访问链接 · 平台猜测：' + platform + ' · 选题猜测：' + (kw || '班级日常'))
        : '演示解析 · 这条链接不像小红书 / 公众号 / 抖音 / 视频号 / B站 / 快手，下面仍是占位文案，请改平台并粘贴真实正文。'
    };
  }

  function filterLow(query) {
    var q = query || {};
    var maxFans = q.maxFans == null ? 5000 : Number(q.maxFans);
    var minAct = q.minAct == null ? 0 : Number(q.minAct);
    var grade = q.grade || 'all';
    var kw = q.kw || '';
    var text = (q.text || '').trim();
    return LOW.filter(function (it) {
      var act = it.like + it.save + it.comment;
      if (maxFans > 0 && it.fans > maxFans) return false;
      if (act < minAct) return false;
      if (grade !== 'all' && it.grade !== grade) return false;
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
    return list.filter(function (it) {
      if (grade !== 'all' && it.grades.indexOf(grade) < 0) return false;
      if (text && (it.title + it.sub + it.blurb).indexOf(text) < 0) return false;
      return true;
    });
  }

  function weekPlan(gradeId, theme) {
    var seeds = SEEDS[gradeId] || SEEDS.g1;
    var prefix = String(theme || '').trim();
    return WEEK_META.map(function (meta, i) {
      var seed = seeds[i];
      return {
        day: meta[0],
        slot: meta[1],
        angle: meta[2],
        title: prefix ? (prefix + ' · ' + seed) : seed,
        topic: prefix ? (prefix + '（' + meta[0] + '：' + seed + '）') : seed
      };
    });
  }

  function outlineFor(input) {
    var ctx = makeCtx(input || {});
    var line = (input && input.coverTitle) ? clampChars(input.coverTitle, 14) : ctx.coverLine || clampChars(ctx.topic, 14);
    if (!line) line = clampChars(ctx.topic, 14);
    var common = '扁平校园插画，奶油色背景，窗光，班旗局部，文具，背影或剪影。不要可识别的未成年人正脸，不要成绩单，不要仿冒校徽。比例 3:4。';
    return [
      { type: '封面', title: line, text: ctx.grade.label + ' · ' + ctx.cls + '。竖版只放这一句大字。', prompt: common + '画面大字：「' + line + '」。' },
      { type: '内容', title: '一个现场细节', text: ctx.sentence, prompt: common + '画面是教室或走廊的一个动作，大字不挡脸。配文：' + clampChars(ctx.sentence, 24) + '。' },
      { type: '内容', title: '准备 / 发生 / 收住', text: '三段各留一个镜头。忙的是具体的事，不是空泛的努力。', prompt: common + '三格小构图，分别是准备、发生、收住，颜色克制。' },
      { type: '内容', title: '给家长的三行', text: '发生了什么；需要配合什么；时间地点以班主任通知为准。', prompt: common + '像一张可转发的便签，字少，留白多。' },
      { type: '总结', title: '下一期只征集一句现场', text: '不打卡，不互赞，不导流。' + ctx.avoid + '。', prompt: common + '结尾页大字：「下一期，一句现场就好」。' }
    ];
  }

  function lowKeywords() {
    var map = {};
    LOW.forEach(function (it) { map[it.kw] = 1; });
    return Object.keys(map);
  }

  return {
    GRADES: GRADES,
    PLATFORMS: PLATFORMS,
    TARGETS: TARGETS,
    COMPOSE: COMPOSE,
    LEXICON: LEXICON,
    HOT: HOT,
    LOW: LOW,
    SEEDS: SEEDS,
    SKILLS: SKILLS,
    CHECKS: CHECKS,
    gradeById: gradeById,
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
