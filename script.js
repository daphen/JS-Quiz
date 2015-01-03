
var questions = [
    {
        question: "question-1",
        alternatives: [
            'WRONG',
            'CORRECT',
            'WRONG'
        ],
        correct: 1
    },
    {
        question: 'question-2',
        alternatives: [
            'WRONG',
            'WRONG',
            'CORRECT'
        ],
        correct: 2,
        style: 'second'
    },
    {
        question: 'question-3',
        alternatives: [
            'WRONG',
            'WRONG',
            'CORRECT'
        ],
        correct: 2
    }],
    currentQuestion,
    alternatives;

 
$(function(){
    currentQuestion = $('.question');
    alternatives    = $('#alternatives');
    $('.start-game').click(function(){
        $('.welcome-screen').fadeOut(300, function(){
            Questioneer.init();
        });
    });
});
 
//Questioneer.checkAnswer(); On correct answer
 
var Questioneer = (function(){
 
    var current;

    function init()
    {

        $('body').on('click', '.try-again', function() {
            $('.result-screen').fadeOut(300, function(){
                showQuestion(0);
            });
        });
        alternatives.on('click', '.guess', function(e) {
            e.preventDefault();
            checkAnswer($(this));
        });
        showQuestion(0);
    }
 
    function wrongAnswer(button)
    {
        button.addClass('shake');
        button.addClass('wrong-guess');
        window.setTimeout(function(){
            $('.guess').removeClass('wrong-guess');
            $('.guess').removeClass('shake');
        }, 670);
    }

    function correctAnswer(button)
    {
        $('.guess').removeClass('wrong-guess');
        button.addClass('correct-guess tada');
    }

    function showResult()
    {
        $('.game').fadeOut(300, function(){
            $('.result-screen').show();
            $('.animated-image').addClass('slideLeft');
        });
    }


    function checkAnswer(button)
    {
        var yourGuess = button.data('guess');
        if (yourGuess != questions[current].correct){
            wrongAnswer(button);
            return;
        }
        correctAnswer(button);
        window.setTimeout(function(){
            if (current + 1 < questions.length){
                showQuestion(current+1);
            }else{
                showResult();
            }
        }, 1000);
    }
 
    function showQuestion(qNo)
    {
        current    = qNo;
        $(".game").fadeOut(300, function(){
            alternatives.html('');
            var style = 'guess';
            if (typeof questions[current].style != "undefined") {
                style += ' '+questions[current].style;
            }
            for(var i = 0; i<questions[current].alternatives.length; i++){
                alternatives.append('<div class="' + style + '" data-guess="'+i+'">'+ questions[current].alternatives[i]+'</div>');

            }
            currentQuestion.html('<h2>'+questions[current].question+'</h2>');
            $(".game").fadeIn(300);
        });
    }
 
    return {
        init: init,
        showResult: showResult
    };

})();
 