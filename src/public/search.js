const searchSetting = {
  maxLength: 8,
};

const getSearchMenuListHTML = ({ states }) => {
  let itemString = '';
  for (let i = 0; i < states.length; i += 1) {
    const state = states[i];
    itemString += `<li>${state}</li>`;
  }
  let resulthtml = `
    <ul class="search-menu-list">
      ${itemString}
    </ul>
  `;
  return resulthtml;
};

$(document).ready(() => {
  const $search = $('#search');
  const $searchMenu = $('.search-menu');
  let value = '';

  $searchMenu.delegate('li', 'click', (event) => {
    const targetValue = event.target.innerText;
    value = targetValue;
    $search.val(targetValue);
    $searchMenu.html(getSearchMenuListHTML({ states: [targetValue] }));
  });

  $search.on('input', () => {
    value = $search.val();
    $.ajax({
      url: '/api/states',
      data: {
        search: value,
        maxLength: searchSetting.maxLength,
      },
      success: (result) => {
        const states = result.data;
        if(!$searchMenu.is(':visible') && states.length > 0) {
          $searchMenu.show();
        }
        if($searchMenu.is(':visible') && states.length === 0) {
          $searchMenu.hide();
        }
        $searchMenu.html(getSearchMenuListHTML({ states }));
      },
    });
  });

  $search.on('focus', () => {
    if ($search.val().length === 0) {
      return;
    }
    if ($('.search-menu-list:not(:has(*))').length > 0) {
      return;
    }
    $searchMenu.show();
  });

  $search.on('blur', () => {
    const $searchMenuList = $('.search-menu-list');
    if ($searchMenuList.find('.active').length !== 0) {
      $searchMenuList.find('.active').removeClass('active');
    }
    if ($searchMenu.is(':visible')) {
      $search.val(value);
    }
    setTimeout(() => {
      $searchMenu.hide();
    }, 100);
  });

  $search.on('keydown', (event) => {
    const $searchMenuList = $('.search-menu-list');

    // 按下 上方鍵
    if (event.keyCode === 38) {
      if ($searchMenuList.find('.active').length === 0) {
        const $target = $searchMenuList.children('li').eq(-1);
        $target.addClass('active');
        $search.val($target.text());
      } else {
        const $current = $searchMenuList.find('.active');
        const $prev = $searchMenuList.find('.active').prev();
        $current.removeClass('active');
        if ($prev.length !== 0) {
          $prev.addClass('active');
          $search.val($prev.text());
        } else {
          $search.val(value);
        }
      }
    }

    // 按下 下方鍵
    if (event.keyCode === 40) {
      if ($searchMenuList.find('.active').length === 0) {
        const $target = $searchMenuList.children('li').eq(0);
        $target.addClass('active');
        $search.val($target.text());
      } else {
        const $current = $searchMenuList.find('.active');
        const $next = $searchMenuList.find('.active').next();
        $current.removeClass('active');
        if ($next.length !== 0) {
          $next.addClass('active');
          $search.val($next.text());
        } else {
          $search.val(value);
        }
      }
    }

    // 按下 enter 鍵
    if (event.keyCode === 13) {
      const $searchMenuList = $('.search-menu-list');
      if ($searchMenuList.find('.active').length !== 0) {
        const newValue = $searchMenuList.find('.active').text();
        value = newValue;
        $search.val(newValue);
        $searchMenu.html(getSearchMenuListHTML({ states: [newValue] }));
        $searchMenu.hide();
      }
    }
  });
});
