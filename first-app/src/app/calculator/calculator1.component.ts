import { Component } from '@angular/core';
import { CalculatorModel } from './CalculatorModel';
@Component({
	selector : 'calculator-1',
	template : `
		<h1>Calculator-1</h1>
		<hr>
		<input type="number" [(ngModel)]="model.number1">
		<input type="number" [(ngModel)]="model.number2">
		<input type="button" value="Add" (click)="model.add()">
		<input type="button" value="Subtract" (click)="model.subtract()">
		<input type="button" value="Multiply" (click)="model.multiply()">
		<input type="button" value="Result" (click)="model.divide()">
		<div>{{model.result}}</div>
	`
})
export class Calculator1Component{
	model : CalculatorModel;

	constructor(){
		this.model = new CalculatorModel();
	}
}