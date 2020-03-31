'use strict'
$(document).ready(function() {

    let animalsObj = [];

    function Img(img) {
      this.image_url = img.image_url;
      this.title = img.title;
      this.description = img.description;
      this.keyword=img.keyword;
      this.horns = img.horns;
    }

    $("select").change(function(){
    
    let selectValue = $("select")[0].value;
    console.log(selectValue);
    let children = $('section');

    console.log(typeof(children));

    console.log(children[1]);

        for (let i = 0; i < 21; i++){
        // console.log(children[i].children[1].alt);
        
        if (selectValue === children[i].children[1].alt){
            // console.log(children[i]);
            let parent = children[i];
            // console.log(parent);
            parent.style.display = 'block';
        }

        else if (selectValue === 'Filter by Keyword'){
            console.log('hi');
            let parent = children[i];
            parent.style.display = 'block';
        }

        else{
            let parent = children[i];
            // console.log(parent);
            parent.style.display = 'none';
        }

    }

    // });
     });

Img.prototype.render = function(){

  let $keywordstemplate = $('#keywordstemplate').html();
  var rendered = Mustache.render($keywordstemplate , this);
  $('header select').append(rendered);

  let $hornsTemplate = $('#horns-template').html();
  var rendered = Mustache.render($hornsTemplate , this);
  $('main').append(rendered);
    // let $imgClone = $("#photo-template").clone();
    //   $imgClone.find("img").attr("src", this.image_url);
    //   $imgClone.find("img").attr("alt", this.keyword);
    //   $imgClone.find("h2").text(this.title);
    //   $imgClone.find("p:nth-child(3)").text(this.description);
    //   $imgClone.find("p:nth-child(4)").text(`horns: ${this.horns}`);
    //   $("main").append($imgClone);
    };

    let readJson = () => {
      $.ajax("data/page-1.json", { method: "GET", dataType: "JSON" }).then(data => {
        data.forEach( imgItem => {
            console.log('hello')
          let img = new Img(imgItem);
          img.render();
          animalsObj.push(img);
        });
      });
    };


    let readJson2 = () => {
      $.ajax("data/page-2.json", { method: "GET", dataType: "JSON" }).then(data => {
        data.forEach( imgItem => {
            console.log('hello')
          let img = new Img(imgItem);
          img.render();
          animalsObj.push(img);
        });
      });
    };
    readJson();


    $('button').click(function(){
      $(this).addClass('active');
      $(this).siblings().removeClass('active');

      if ($(this).attr('id') === 'button1'){
        $('main').empty();
        $('select').empty();
        let $keywordstemplate = $('#keywordstemplate').html();
        var rendered = Mustache.render($keywordstemplate , {keyword: 'Filter by Keyword'});
        $('select').append(rendered);
        readJson();
      }
      else{
        $('main').empty();
        $('select').empty();
        let $keywordstemplate = $('#keywordstemplate').html();
        var rendered = Mustache.render($keywordstemplate , {keyword: 'Filter by Keyword'});
        $('select').append(rendered);
        readJson2();
      }
    });


  });

