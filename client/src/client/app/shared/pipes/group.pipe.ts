import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'groups',  pure: false })

export class GroupsPipe implements PipeTransform {
  transform(items: any[], filterGroups: any[]): any {
    if(!items) 
    { 
      return [];
    }
    else if(!filterGroups) 
    {
      return items;
    }
    else
    {
      var result= items.filter( item =>
      {      
        // for(var i=0; i < filterGroups.length; i++)
        // {
        //   if(filterGroups[i].data.id == item.etraining_group_id)
        //   {
        //     return true;
        //   }
        // } 
        // return false;

        var found = filterGroups.find(function(element){
          return element.data.id == item.etraining_group_id;
        });
        return found;

      });
      return result;
    } 
  }
}


// export class GroupsPipe implements PipeTransform {
//   transform(items: any[], id: number): any[] {
//     if(!items) return [];
//     if(!id) return items;
//     return items.filter(function(hero){
//       return hero.etraining_group_id == id;
//     });
//    }
// }

// export class GroupsPipe implements PipeTransform {
//   transform(object: any[], args: any[] = null): any {
//     console.log(object);
//     return object;

//   }
// }