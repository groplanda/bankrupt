<?php namespace Acme\Quiz\Components;

use Cms\Classes\ComponentBase;
use Acme\Quiz\Models\Question;
use Backend\Models\User;

use Input;
use Mail;
use Validator;
use ValidationException;
use Flash;
use Response;

class Quiz extends ComponentBase
{
    public $quiz;

    public function componentDetails()
    {
        return [
            'name'          => 'Опросник',
            'description'   => 'Отображение опросника'
        ];
    }

    public function defineProperties()
    {
        return [
            'quizName' => [
                'title'             => 'Выберите опросник',
                'type'              => 'dropdown',
                'default'           => 'us'
            ]

        ];
    }

    public function getQuizNameOptions()
    {
        return Question::all()->lists('title', 'id');
    }

    public function onRun()
    {
        $quiz = new Question;
        $this->quiz = $quiz->where( 'id', '=', $this->property('quizName') )->first();
        $this->addJs('/plugins/acme/quiz/assets/js/quiz.js');
    }

    public function getUserMail()
    {
        return User::where('is_superuser', 1)->value('email');
    }

    public function onSend()
    {

        $rules = [
        'user_name'  => 'required|min:3|max:50',
        'user_phone' => 'required|min:5|max:50',
        ];

        $messages = [
        'required' => 'Поле обязательно к заполнению!',
        'min'      => 'Минимум :min символов!',
        'max'      => 'Максимум :max символов!',
        ];

        $validator = Validator::make(Input::all(), $rules, $messages);
        //если не прошло валидацию
        if ($validator->fails()) {

        throw new ValidationException($validator);

        } else {
        $vars = [
            'data' => Input::all(),
        ];
        //отправка на почту
        Mail::send('acme.quiz::mail.message', $vars, function($message) {
            $message->to($this->getUserMail(), 'Admin Person');
            $message->subject('Расчет с сайта');
        });
        Flash::success('Запрос успешно отправлен!');

        }

    }

}