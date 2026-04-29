import { Component, signal } from '@angular/core';
import { BookApiCreateSchema, BookCreateItem } from '../types/schemas';
import { form, FormField, FormRoot, required, validateStandardSchema,  } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-books-add',
  imports: [FormField, FormRoot, JsonPipe],
  template: `
    <p>Add a book</p>
    <p> {{ form().valid()  }}</p>
    <form [formRoot]="form">
      <label>Title<input [formField]="form.title" type="text" /></label>
      <label>Author<input [formField]="form.author" type="text" /></label>
      <label>Year Released<input [formField]="form.yearReleased" type="number" /></label>
      <button type="submit" class="btn btn-primary">Add This Book</button>
    </form>

    <pre>
    {{ model() | json}}
</pre>
  `,
  styles: ``,
})
export class Add {

    model = signal<BookCreateItem>({
        title: '',
        author: '',
        yearReleased: 0,
   
    })
    form = form(this.model, schema => {
       validateStandardSchema(schema, BookApiCreateSchema);
    })

}
