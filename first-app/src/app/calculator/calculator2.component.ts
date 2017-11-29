import { Component } from '@angular/core';
import { CalculatorModel } from './CalculatorModel';

@Component({
	selector : 'calculator-2',
	templateUrl : 'calculator2.component.html'
})
export class Calculator2Component{
	model : CalculatorModel = new CalculatorModel();

}