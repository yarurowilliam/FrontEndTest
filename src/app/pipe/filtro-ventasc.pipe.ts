import { Pipe, PipeTransform } from '@angular/core';
import { Articulo } from 'src/app/models/articulo';
@Pipe({
  name: 'filtroVentasc'
})
export class FiltroVentascPipe implements PipeTransform {

  transform(articulos: Articulo[], searchText: string) {
    if (searchText == null) return articulos;
    return articulos.filter(articulo =>
      articulo.referencia.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
      articulo.nombre.toLowerCase().indexOf(searchText.toLowerCase())  !== -1 
    );
  }
}
