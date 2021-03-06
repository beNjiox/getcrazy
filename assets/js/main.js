function Game()
{
	var self = this;

	this.NOT_STARTED = 0
	this.STARTED = 1
	this.FINISHED = 2


	this.questions = [
		"Calcul 1 + 1",
		"Pluriel de cheval",
		"Quelle est l'année de la revolution française",
		"Final de la coupe de france, combien de but de zidane?",
		"Charlie et ?",
		"6*7 ?"
	];

	this.answers = [
		"2",
		"chevaux",
		"1789",
		"2",
		"Lulu",
		"42"
	];

	this.handle_submit = function()
	{
		console.log("Game status = " + self.game_status)
		if (self.game_status == self.STARTED)
		{
			self.check_answer()			
			if (self.is_last_question())
			{
				self.game_status = self.FINISHED
			}			
		}
		else if (self.game_status == self.NOT_STARTED)
		{
			$("#submit_answer").text("Submit")
			$('#main-row').find('input').fadeIn()
			self.game_status = self.STARTED
		}
		else
		{			
			self.check_answer()
			self.update_score()		
			return self.game_over()
		}

		self.display_next_question()		
		self.update_score()		
	}

	this.game_over = function()
	{
		$("#game").fadeOut();
		$("#game_over").fadeIn()
	}

	this.is_last_question = function()
	{
		number_of_questions = parseInt(self.questions.length)
		console.log ("Is last question? " + self.question_number + " " + number_of_questions)
		return self.question_number === number_of_questions
	}

	this.check_answer = function()
	{		
		console.log("Check Answer")
		answer_expected = self.answers[self.question_number - 2]
		answer = $('#main-row').find('input').val()
		console.log(answer_expected + " == " + answer + " ? (Question N" + self.question_number + ")")
		if (answer == answer_expected)
		{
			self.score += 10
		}			
	}

	this.display_next_question = function()
	{
		if (self.question_number == self.questions.length)		
			$('#game h1').text("No more question!")
		else
		{
			$('#game h1').text(this.questions[this.question_number])
			$('#main-row').find('input').focus()
		}			
		$('#main-row').find('input').val('')
		self.question_number++
	}

	this.update_score = function()
	{
		console.log ("update score " + self.score)
		$(".score").text(self.score)
	}

	this.reset = function()
	{
		self.question_number = 0;		
		self.score = 0
		self.display_next_question()
		self.update_score()
		self.game_status = self.NOT_STARTED
		$("#game").fadeIn();
		$("#game_over").fadeOut()
	}

	this.question_number = 0;
	this.number_of_question_remaining = questions.length;
	this.score = 0
	$("#submit_answer").on('click', this.handle_submit)
	$("#reset").on('click', this.reset)
	this.display_next_question()
	this.update_score()
	this.game_status = this.NOT_STARTED

	$(document).keydown(function(event) {
 		if (event.keyCode == 13)
 		{
			console.log("Go")
			self.handle_submit()
 		}      		
	})
}


$(document).ready(function(){
	Game()
})