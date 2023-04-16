# bookshop-js

A simple book store API in need of input validation/sanitization.

This is a part of the University of Wyoming's Secure Software Design Course (Spring 2023). This is the base repository to be forked and updated for various assignments. Alternative language versions are available in:

- [Go](https://github.com/andey-robins/bookshop-go)
- [Rust](https://github.com/andey-robins/bookshop-rs)

## Versioning

`bookshop-js` is built with:

- node version v16.19.0
- npm version 9.6.2
- nvm version 0.39.3

## Usage

Start the api using `npm run dev`

I recommend using [`httpie`](https://httpie.io) for testing of HTTP endpoints on the terminal. Tutorials are available elsewhere online, and you're free to use whatever tools you deem appropriate for testing your code.

***************************************************************************************************************************************************
                                                         Changes Made
***************************************************************************************************************************************************
-----Current Iteration------

The primary change made to this code base was the addition of a basic validator function that takes an input string as an argument and determines if it contains characters deemed "forbidden." Validator uses a regular expression to test for special characters commonly used in SQL injection attack and return aboolean value indicating a pass/fail. Each endpoint now uses this validator to check any user provided data before any database queries happen and if user input fails validation the API returns Error 422* "unprocessable entity" with a json body of "status": "failed: contains forbidden characters."

-----Potential Modifications-----

As requested by the client, this is a very basic implementation of input validation. The simplicity of this particular implementation allows for it to be further tailored to the client's needs in any future revisions. For example, if the client's customer base felt that the current responses for a failed post weren't specific enough, individual validation tests and errors could be constructed for every user provided data field, offering a more concise communication. 

This approach does also have its drawbacks due to the simple nature of the implementation. The primary case that I foresee this potentially causing issues for the client is the case where a special character is needed for a valid field. For example, if a user were to provide the [Example Json] below as the body for a post /books/new request, their request would fail even though the book in question is perfectly valid. 

[Example Json]
{
   "title": "Scott Pilgrim's Precious Little Life (Volume 1)".
   "author": "Brian Lee O'Malley",
   "price": "14.99"
}

This could also extend into other small parts of operation such as if a PO contains a "-" character or if a single printing contains two books and the title section uses a "/" to separate individual titles. Edge cases like this one would be ultimately need more input from the client as to how to handle in furtherrevisions of the validator function as there are a number of ways to approach the problem ranging from a more robust validation method to indivualizedvalidators for each user provided field, each with their own perks and drawbacks. 

*I think this is the correct error code to throw in this instance as the request is understood, but due to containing forbidden characters, it isunprocessable. Not 100% on that one but I went for what I felt was most appropriate in this instance.

******************************************************************************************************************************************************
                                                          Security Review
******************************************************************************************************************************************************

Revisions to the current iteration of the bookstore API would improve the overall security for both users and the bookstore themselves. Potential securityrevisions will be catagorized as confidentiality, integrity, or accessibility concerns and will have a brief overview of the issue, its level of impact, and potential action moving forward.

-----Confidentiality-----

As of right now there is no protection in place for the confidentiality of customers names and addresses as they sit on the database entirely exposed. 
Impact Level: 8
Leaving the customer's data exposed could lead to personal information contained within the database. To mitigate this, I propose encrypting the customer table in the database while it's not in use, only to be decryted to provide the needed information upon proper authentication and immediately encrypted again.

-----Integrity-----

Currently, there are no data integrity checks present within the system.
Impact Level: 5
As most of the data contained within this database is not sensitive in nature, data integrity has a lesser impact, however as this is a business API it is important to ensure that any possible transaction data is correct. To do so, I propose that a system be implemented that checks for data integrity any time data that could be relevant to purchases is accessed or modified. Individual fields within the database can be paired with a corresponding MAC that can be checked at access time and updated when the field is modified in the database to ensure the data's integrity.

Additionally, there is no logging system present within the system.
Impact Level: 7
A logging system that details usage information would be beneficial in verifying that the data contained within the database is correct. I propose that a system be implemented that prints the time and pertinent usage details of all API calls to a log file stored on the server.

-----Accessibility-----

The current iteration of input validation presents accessibility issues.
Impact Level: 4
Proposed changes to the input validation system are outlined in the "Changes Made" section above.


