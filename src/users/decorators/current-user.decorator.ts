import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//while creating a decorator we need a createdecorator method and a execution context
// an execution context means what kind of request the function is getting
// we use execution context cause it can handel all sort like gql socket and all

//so understanding how this is working
/* the user variable on the first invoest the decorator 
and does the work inside the decorator and when the job is complete inside the decorator
it then executes after the decorator
like i did the overritign and all but firsly the decoratotr was called
similarly the decorator like the get and post decorators
the string passed is handeled using the funtion thast is somewhere writeedn

*/
export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log(request.session.userId);
    return 'hello there';
  },
);
