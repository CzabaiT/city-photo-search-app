import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { SearchInstructionComponent } from './components/search/search-instruction/search-instruction.component';
import { CitySearchTypeaheadComponent } from './components/search/city-search-typeahead/city-search-typeahead.component';
import { CitySearchResultsOverlayComponent } from './components/search/city-search-typeahead/city-search-results-overlay/city-search-results-overlay.component';
import { PhotoSearchButtonComponent } from './components/search/photo-search-button/photo-search-button.component';

@NgModule({
  declarations: [
    SearchComponent,
    CitySearchTypeaheadComponent,
    CitySearchResultsOverlayComponent,
    PhotoSearchButtonComponent,
    SearchInstructionComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  exports: [
    SearchComponent,
    CitySearchTypeaheadComponent,
    PhotoSearchButtonComponent,
    SearchInstructionComponent,
  ],
})
export class SearchModule {}
