import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'groups',  pure: false })

export class GroupsPipe implements PipeTransform {
  transform(value: any[], filterGroups: any[]): any {
    if(!value) 
    { 
      return [];
    }
    else if(!filterGroups) 
    {
      return value;
    }
    else
    {
      var keys=[];
      value.filter(function (el) {
        filterGroups.filter(function(group){
          if(group.id == el.etraining_group_id)
            {
              keys.push(el);
            }
          }).length == 0  
      });
      return keys;
    } 
  }
}

// export class GroupsPipe implements PipeTransform {
//   transform(value: any[], filterGroups: any[]): any[] {
//     if(!value) return [];
//     if(!filterGroups) return value;
//     return value.filter(function(hero){
//       return filterGroups.filter(function(group){
//         return group.id == hero.etraining_group_id;
//       }).length == 0
//     });
//    }
// }

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