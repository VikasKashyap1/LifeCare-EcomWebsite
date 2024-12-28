import passwordValidator from 'password-validator'
var schema = new passwordValidator();

// Add properties to it
schema
     .is().min(8)                                    // Minimum length 8
     .is().max(50)                                  // Maximum length 100
     .has().uppercase(1)                              // Must have uppercase letters
     .has().lowercase(1)                              // Must have lowercase letters
     .has().digits(2)                                // Must have at least 2 digits
     .has().not().spaces()                           // Should not have spaces
     .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

export default function FormVlidator(event) {
     let { name, value } = event.target
     switch (name) {
          case 'name':
          case 'color':
               if (value.length === 0) {
                    return name + " is maindetery"
               }
               else if (value.length < 4 || value > 28) {
                    return name + " length must be 4 to 28 charactor "
               }
               else {
                    return ""
               }
          case 'subjact':
               if (value.length === 0) {
                    return name + " is maindetery"
               }
               else if (value.length < 20 || value > 100) {
                    return name + " length must be 4 to 28 charactor "
               }
               else {
                    return ""
               }
          case 'username':
               if (value.length === 0) {
                    return name + " is maindetery"
               }
               else if (value.length < 4 || value > 28) {
                    return name + " must be at least 4 to 30 characters long,"
               }
               else {
                    return ""
               }
          case 'email':
               const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
               if (value.length === 0) {
                    return name + " address is maindetery"
               }
               else if (emailRegex.test(value)) {
                    return ""
               }
               else {
                    return name + " please fill valid Email address "
               }

          // phone
          case 'phone':
               const phoneRegex = /^[6-9]\d{9}$/;
               if (value.length === 0) {
                    return name + " number is mandatory";
               } else if (!phoneRegex.test(value)) {
                    return " please enter a valid phone number";
               } else {
                    return "";
               }

          case 'password':
               // const passwordRegex = /^(?=.*[1-9a-zA-B])(?=.*[a-zA-Z])[1-9A-Za-z]{8,}$/;//(?=.*[@$!%*#?&])
               if (value.length === 0) {
                    return name + "  is maindetery"
               }
               else if (value.length < 8 || value > 20) {
                    return name + " must be 8 to 20 character  "
               }
               else if (!(schema.validate(value))) {
                    return name + " please create strong password,  is weak password "
               }
               else {
                    return ""
               }
          // size
          case 'size':
               if (value.length === 0) {
                    return name + "name is maindetery"
               }
               else if (value > 10) {
                    return name + " length must be 10 charactor "
               }
               else {
                    return ""
               }
          // BasePrice
          case 'basePrice':
               if (value === 0) {
                    return name + "name is maindetery"
               }
               else if (value < 10) {
                    return " basePrice must be greater then 10 rupees "
               }
               else {
                    return ""
               }
          // Discount
          case 'discount':
               if (value === 0) {
                    return name + "name is maindetery"
               }
               else if (value < 5 || value > 100) {
                    return " Discount must be 5-100 "
               }
               else {
                    return ""
               }
          // Quantity
          case 'quantity':
               if (value === 0) {
                    return name + "name is maindetery"
               }
               else if (value < 0) {
                    return " base price  must be greate then or equal to 0 "
               }
               else {
                    return ""
               }

          case 'caption':
               if (value.length == 50) {
                    return name + "name is maindetery"
               }
               else if (value.length < 40) {
                    return name + " length must be 41 charactor write "
               }
               else {
                    return ""
               }
          case 'massage':
               if (value.length == 30) {
                    return name + "name is maindetery"
               }
               else if (value.length < 30) {
                    return name + " length must be more than 30 charactor  "
               }
               else {
                    return ""
               }
          default:
               return ""
     }





}
