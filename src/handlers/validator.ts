/*
This is a simple input validator function. It takes an input string and returns
true if the input has no special characters and false if it does contain special
characters. This function is used anywere a user provides data.
*/


export const validate = function(input:string) 
{
    const forbidden = /[\\\^\-\][?$"(){}]/
    return !forbidden.test(input);
}
