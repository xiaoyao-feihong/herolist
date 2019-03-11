$(function () {
  // 获取英雄列表的方法
  function getHeroList() {
    $.ajax({
      url: 'http://127.0.0.1:5001/getallhero',
      type: 'get',
      success: function (result) {
        // 处理返回的日期格式为指定格式
        var len = result.data[0].ctime.length
        result.data.forEach(element => {
          element.ctime = element.ctime.substr(0,len - 5)
          element.ctime = element.ctime.replace('T',' ')
        });
        var str = template('row', result)
        $('#tbd').html(str)
        updateHero();
        deleteHero()
      }
    })
  }

  getHeroList()

  $('#add').on('click', function () {
    $('.ui.modal.addHero').modal('show')
  })

  // 初始化所有下拉框的样式
  $('.ui.dropdown').dropdown()

  // 添加英雄
  $('#btnAdd').on('click', function () {
    $.ajax({
      url: 'http://127.0.0.1:5001/addhero',
      data: $('.form1').serialize(),
      type: 'post',
      dataType: 'json',
      success: function (result) {
        console.log(result)
        if (result.status === 200) {
          getHeroList()
        }
      }
    })
  })

  // 更新英雄
  var id;
  function updateHero() {
    $('.update').on('click', function (e) {
     id = parseInt($(this).attr('index'))
     $('.ui.modal.updateHero').modal('show')
    })

    $('#btnUpdate').on('click',function(e) {
      console.log(id)
      $.ajax({
        url: 'http://127.0.0.1:5001/updatehero/' + id,
        type: 'post',
        dataType: 'json',
        data:  $('.form2').serialize(),
        success: function (result) {
          console.log(result)
          if(result.status === 200){
            getHeroList()
          }
        }
      })
    })
  }

  // 删除英雄
  function deleteHero () {
    $('.delete').on('click',function () {
      id = parseInt($(this).attr('index'))
      $('.ui.modal.deleteHero').modal('show')
    })

    $('.confirm').on('click',function () {
      $.ajax({
        url: 'http://127.0.0.1:5001/deletehero/' + id,
        type: 'get',
        success: function (result) {
          if(result.status === 200) {
            getHeroList();
          }
          $('.ui.modal.deleteHero').modal('hide')
        }
      })
    })

    $('.cancel').on('click',function () {
      $('.ui.modal.deleteHero').modal('hide')
    })
  }
})
