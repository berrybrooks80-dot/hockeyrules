/* ==========================================================================
   HockeyRules — Referee signal infographics
   Each signal is drawn on one shared 200x210 stage: head, jersey, ice guide.
   Arms are thick round-capped strokes; a cyan accent marks the acting arm.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- shared stage pieces ---------- */
  var STAGE = [
    '<ellipse class="sg-guide" cx="100" cy="190" rx="64" ry="9"/>',
    '<path class="sg-jersey" d="M100 60 L100 146" stroke-opacity=".35"/>',
    '<path class="sg-jersey" d="M72 68 Q100 57 128 68 L137 139 Q100 151 63 139 Z"/>',
    '<circle class="sg-head" cx="100" cy="43" r="13.5"/>',
    '<path class="sg-limb" d="M100 57 L100 63" stroke-width="6"/>'
  ].join('');

  var LEGS = [
    '<path class="sg-limb" d="M86 141 L80 181"/>',
    '<path class="sg-limb" d="M114 141 L120 181"/>',
    '<path class="sg-detail" d="M72 183 L86 183"/>',
    '<path class="sg-detail" d="M114 183 L128 183"/>'
  ].join('');

  function arm(d, cls) {
    return '<path class="sg-limb' + (cls ? ' ' + cls : '') + '" d="' + d + '"/>';
  }
  function motion(d) { return '<path class="sg-motion" d="' + d + '"/>'; }
  function detail(d, cls) {
    return '<path class="sg-detail' + (cls ? ' ' + cls : '') + '" d="' + d + '"/>';
  }
  function fist(x, y, r) {
    return '<circle class="sg-open" cx="' + x + '" cy="' + y + '" r="' + (r || 7) + '"/>';
  }

  /* ---------- the 23 signals ---------- */
  var SIGNALS = [
    {
      name: 'Delayed Penalty',
      ko: '지연 페널티 페널티 지연 딜레이',
      desc: 'Delayed calling of a penalty or other violation. Arm extended fully above the head, hand without the whistle.',
      svg: arm('M74 72 L58 112 L52 132') +
           arm('M126 72 L150 44 L150 20', 'sg-limb--accent') +
           motion('M138 16 L150 8 L162 16') +
           motion('M133 26 L120 30') +
           motion('M151 30 L164 34')
    },
    {
      name: 'Checking From Behind',
      ko: '뒤에서 체크 백체크 보드 뒤',
      desc: 'A forward motion of both arms, palms open and facing away from the body, extended from the chest at shoulder level.',
      svg: arm('M76 92 L46 92') +
           arm('M124 92 L154 92') +
           '<ellipse class="sg-open" cx="40" cy="92" rx="6.5" ry="8"/>' +
           '<ellipse class="sg-open" cx="160" cy="92" rx="6.5" ry="8"/>' +
           motion('M34 74 L22 62') + motion('M166 74 L178 62') +
           motion('M44 72 L40 58') + motion('M156 72 L160 58')
    },
    {
      name: 'Match',
      ko: '매치 페널티 퇴장',
      desc: 'The flat part of the hand patted on top of the head. Signals a match penalty.',
      svg: arm('M74 72 L60 112 L54 132') +
           arm('M126 74 L142 56 L134 26', 'sg-limb--accent') +
           '<rect class="sg-open" x="112" y="14" width="26" height="9" rx="4.5"/>' +
           motion('M138 12 L138 4') + motion('M124 12 L124 4')
    },
    {
      name: 'High Sticking',
      ko: '하이 스틱 하이스틱킹 높은 스틱',
      desc: 'Both fists clenched, one immediately above the other, held at the height of the shoulders.',
      svg: arm('M74 74 L96 84 L112 84', 'sg-limb--accent') +
           arm('M126 76 L110 96 L92 96', 'sg-limb--accent') +
           fist(116, 84, 7.5) + fist(88, 96, 7.5) +
           '<path class="sg-detail" d="M104 70 L104 110" stroke-opacity=".4"/>'
    },
    {
      name: 'Possible Icing',
      ko: '아이싱 가능 퍽 아웃 오브 플레이',
      desc: 'The back official fully extends a free arm above the head, without the whistle, to signal a possible icing.',
      svg: arm('M74 74 L62 114 L56 134') +
           arm('M126 72 L134 36 L134 14', 'sg-limb--accent') +
           '<circle class="sg-open" cx="134" cy="10" r="6"/>' +
           motion('M122 10 L110 14') +
           motion('M146 10 L158 14') +
           detail('M126 20 L142 20', 'sg-warm')
    },
    {
      name: 'Goal',
      ko: '골 득점 골인',
      desc: 'The referee points directly into the net to indicate that a goal has been scored.',
      svg: '<path class="sg-detail" d="M158 76 L192 84 L192 126 L158 118 Z" stroke-opacity=".75"/>' +
           detail('M168 79 L168 121') + detail('M179 81 L179 123') +
           arm('M74 74 L60 114 L54 134') +
           arm('M126 76 L152 92 L170 98', 'sg-limb--accent') +
           '<circle class="sg-fill-ice" cx="174" cy="99" r="4.5"/>'
    },
    {
      name: 'Penalty Shot',
      ko: '페널티 샷 페널티슛',
      desc: 'Both arms crossed above the head, the signal of a stoppage in play for a penalty shot.',
      svg: arm('M74 72 L94 28 L124 12', 'sg-limb--accent') +
           arm('M126 72 L106 28 L76 12', 'sg-limb--accent') +
           '<circle class="sg-open" cx="128" cy="10" r="5.5"/>' +
           '<circle class="sg-open" cx="72" cy="10" r="5.5"/>' +
           detail('M84 62 L116 62', 'sg-warm')
    },
    {
      name: 'Hand Pass',
      ko: '핸드 패스 손으로 패스',
      desc: 'The open part of the hand displayed in a pushing motion, indicating a hand pass.',
      svg: arm('M74 76 L62 114 L56 134') +
           arm('M126 78 L154 96 L172 104', 'sg-limb--accent') +
           '<path class="sg-open" d="M168 96 L182 92 M167 102 L182 101 M165 108 L179 111" stroke-linecap="round"/>' +
           motion('M150 84 L160 78') + motion('M156 116 L166 122')
    },
    {
      name: 'Icing The Puck',
      ko: '아이싱 퍽 아이싱 콜',
      desc: 'Arms folded across the upper chest to confirm the completed icing, before the official skates to the face-off spot.',
      svg: arm('M74 74 L98 88 L124 88') +
           arm('M126 74 L102 98 L76 98') +
           detail('M100 80 L100 96', 'sg-warm') +
           motion('M64 108 L52 118') + motion('M136 108 L148 118')
    },
    {
      name: 'Holding',
      ko: '홀딩 붙잡기 잡기',
      desc: 'Clasping either wrist with the other hand in front of the chest.',
      svg: arm('M74 76 L96 94 L108 94') +
           arm('M126 78 L114 96 L100 94', 'sg-limb--accent') +
           '<circle class="sg-open" cx="104" cy="94" r="8"/>' +
           detail('M98 90 L110 98', 'sg-warm') +
           motion('M132 108 L142 116')
    },
    {
      name: 'Slashing',
      ko: '슬래싱 스틱 치기',
      desc: 'A chopping motion with the edge of one hand across the opposite forearm.',
      svg: arm('M74 80 L100 90 L124 94') +
           arm('M126 66 L110 78 L100 88', 'sg-limb--accent') +
           '<path class="sg-open" d="M96 84 L108 92"/>' +
           motion('M116 58 L124 50') +
           '<path class="sg-detail sg-detail--warm" d="M92 78 L86 70 M100 74 L98 64"/>'
    },
    {
      name: 'Hooking',
      ko: '후킹 걸기 걸어당기기',
      desc: 'A tugging motion with both arms, as if pulling something back from in front of the stomach.',
      svg: arm('M74 78 L80 106 L94 118', 'sg-limb--accent') +
           arm('M126 78 L120 106 L106 118', 'sg-limb--accent') +
           fist(96, 120, 6) + fist(104, 120, 6) +
           motion('M58 108 L70 116') + motion('M142 108 L130 116')
    },
    {
      name: 'Roughing',
      ko: '러핑 거친 플레이 주먹',
      desc: 'A clenched fist with the arm extended out to the side of the body.',
      svg: arm('M74 78 L62 116 L56 134') +
           arm('M126 84 L166 84', 'sg-limb--accent') +
           fist(174, 84, 8) +
           motion('M158 68 L170 62') + motion('M158 100 L170 106')
    },
    {
      name: 'Cross Checking',
      ko: '크로스 체킹 크로스체크',
      desc: 'A forward motion with both fists clenched, extending out from the chest.',
      svg: arm('M78 92 L50 92', 'sg-limb--accent') +
           arm('M122 92 L150 92', 'sg-limb--accent') +
           fist(42, 92, 8) + fist(158, 92, 8) +
           motion('M62 76 L50 66') + motion('M138 76 L150 66') +
           motion('M50 108 L40 118') + motion('M150 108 L160 118')
    },
    {
      name: 'Charging',
      ko: '차징 돌진 세 스트라이드',
      desc: 'Rotating clenched fists around one another in front of the chest.',
      svg: arm('M74 80 L92 94') +
           arm('M126 80 L108 94') +
           fist(94, 96, 7) + fist(106, 96, 7) +
           '<path class="sg-motion" d="M86 84 a16 16 0 1 1 0 24" />' +
           '<path class="sg-motion" d="M114 108 a16 16 0 1 1 0 -24" />'
    },
    {
      name: 'Spearing',
      ko: '스피어링 찌르기 스틱 찌르기',
      desc: 'A jabbing motion with both hands thrust out directly in front of the body.',
      svg: arm('M74 84 L88 104 L96 112') +
           arm('M126 84 L112 104 L104 112') +
           fist(98, 114, 6) + fist(104, 114, 6) +
           '<path class="sg-detail sg-detail--warm" d="M101 118 L101 148"/>' +
           '<path class="sg-motion" d="M86 132 L98 142 M116 132 L104 142"/>' +
           motion('M101 158 L101 166')
    },
    {
      name: 'Interference',
      ko: '인터피어런스 방해',
      desc: 'Crossed arms with closed fists, held stationary in front of the chest.',
      svg: arm('M74 80 L102 92 L128 96') +
           arm('M126 80 L98 92 L72 96') +
           fist(132, 96, 7) + fist(68, 96, 7) +
           detail('M86 100 L86 108', 'sg-warm') + detail('M114 100 L114 108', 'sg-warm')
    },
    {
      name: 'Washout',
      ko: '와시아웃 노골 노아이싱 취소',
      desc: 'No goal or no icing. Both arms are swept outward and across in front of the body.',
      svg: arm('M78 96 L44 96', 'sg-limb--accent') +
           arm('M122 96 L156 96', 'sg-limb--accent') +
           '<path class="sg-open" d="M40 90 L40 102"/>' +
           '<path class="sg-open" d="M160 90 L160 102"/>' +
           motion('M56 78 L40 66') + motion('M144 78 L160 66') +
           motion('M56 114 L40 126') + motion('M144 114 L160 126')
    },
    {
      name: 'Butt Ending',
      ko: '버트 엔딩 스틱 손잡이',
      desc: 'A cross motion of the forearms, one passing under the other.',
      svg: arm('M74 78 L100 88 L128 100', 'sg-limb--accent') +
           arm('M126 78 L100 90 L72 102', 'sg-limb--ghost') +
           detail('M92 96 L108 92', 'sg-warm') +
           motion('M138 108 L148 116') + motion('M62 110 L52 118')
    },
    {
      name: 'Boarding',
      ko: '보딩 보드 체크',
      desc: 'Striking the clenched fist of one hand into the open palm of the other in front of the chest.',
      svg: arm('M74 78 L90 92 L102 96') +
           arm('M126 66 L110 84 L102 94', 'sg-limb--accent') +
           '<ellipse class="sg-open" cx="98" cy="97" rx="9" ry="6"/>' +
           fist(104, 92, 6.5) +
           motion('M118 58 L128 50') +
           '<path class="sg-detail sg-detail--warm" d="M88 84 L84 76 M96 82 L95 74"/>'
    },
    {
      name: 'Tripping',
      ko: '트리핑 걸어 넘어뜨리기 발 걸기',
      desc: 'With both skates on the ice, striking the right leg with the right hand below the knee.',
      svg: LEGS +
           arm('M74 74 L60 112 L54 132') +
           arm('M126 78 L146 116 L142 146', 'sg-limb--accent') +
           '<circle class="sg-fill-ice" cx="140" cy="150" r="4.5"/>' +
           motion('M152 156 L160 164') + motion('M128 158 L120 166')
    },
    {
      name: 'Kneeing',
      ko: '니잉 무릎',
      desc: 'Slapping either knee with the palm of the hand while keeping both skates on the ice.',
      svg: LEGS +
           arm('M74 74 L62 112 L56 132') +
           arm('M126 78 L136 108 L130 126', 'sg-limb--accent') +
           '<ellipse class="sg-open" cx="126" cy="132" rx="9" ry="6.5"/>' +
           motion('M142 120 L150 126') + motion('M112 140 L108 148')
    },
    {
      name: 'Elbowing',
      ko: '엘보잉 팔꿈치',
      desc: 'Tapping either elbow with the other hand.',
      svg: arm('M74 74 L46 96 L52 126') +
           arm('M126 76 L100 82 L64 92', 'sg-limb--accent') +
           '<circle class="sg-open" cx="46" cy="96" r="7"/>' +
           motion('M34 86 L26 78') + motion('M34 106 L26 114')
    }
  ];

  /* ---------- render ---------- */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function buildCard(sig, i) {
    var idx = (i + 1 < 10 ? '0' : '') + (i + 1);
    var search = (' ' + sig.name + ' ' + sig.ko + ' ' + sig.desc).toLowerCase();

    return '<article class="signal-card" data-search="' + esc(search) + '" style="animation-delay:' +
      Math.min(i * 22, 340) + 'ms">' +
      '<span class="signal-idx" aria-hidden="true">' + idx + '</span>' +
      '<figure class="signal-figure" role="img" aria-label="Illustrated referee signal: ' + esc(sig.name) + '">' +
        '<svg viewBox="0 0 200 210" aria-hidden="true" focusable="false">' +
          STAGE + sig.svg +
        '</svg>' +
      '</figure>' +
      '<h3 class="signal-name">' + esc(sig.name) + '</h3>' +
      '<p class="signal-desc">' + esc(sig.desc) + '</p>' +
    '</article>';
  }

  function init() {
    var grid = document.getElementById('signalGrid');
    if (!grid) { return; }

    grid.innerHTML = SIGNALS.map(buildCard).join('');

    var input = document.getElementById('signalSearch');
    var count = document.getElementById('signalCount');
    var empty = document.getElementById('signalEmpty');
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.signal-card'));

    if (count) { count.textContent = cards.length + ' signals'; }

    function filter() {
      var q = (input && input.value ? input.value : '').trim().toLowerCase();
      var shown = 0;

      cards.forEach(function (card) {
        var match = !q || card.getAttribute('data-search').indexOf(q) !== -1;
        card.hidden = !match;
        if (match) { shown++; }
      });

      if (count) {
        count.textContent = q
          ? shown + ' of ' + cards.length + ' signals'
          : cards.length + ' signals';
      }
      if (empty) { empty.hidden = shown !== 0; }
    }

    if (input) { input.addEventListener('input', filter); }

    // expose count on the page-level script for debugging
    window.HOCKEY_SIGNAL_COUNT = cards.length;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
