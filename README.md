[![npm version](https://badge.fury.io/js/wizardify.svg)](https://www.npmjs.com/package/wizardify)
# wizardify

A simple jquery plugin that converts forms into simple wizards.

## Usage and examples

* Install.   
```bash
yarn add wizardify
```
```bash
npm install wizardify
```
### [Demo](http://htmlpreview.github.io/?https://raw.githubusercontent.com/vasilevich/wizardify/master/index.html)

* use examples
    ```html
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
       <link rel="stylesheet" href="dist/css/wizardify.css">
       <form id="wizard" role="form" action="" method="post" class="f1">
                           <div class="f1-steps">
                               <div class="f1-progress">
                                   <div class="f1-progress-line"></div>
                               </div>
                               <div class="f1-step">
                                   <div class="f1-step-icon"><i class="fa fa-user"></i></div>
                                   <p>about</p>
                               </div>
                               <div class="f1-step">
                                   <div class="f1-step-icon"><i class="fa fa-key"></i></div>
                                   <p>account</p>
                               </div>
                               <div class="f1-step">
                                   <div class="f1-step-icon"><i class="fa fa-twitter"></i></div>
                                   <p>social</p>
                               </div>
                           </div>
                           <fieldset>
                               <h4>Tell us who you are:</h4>
                               <div class="form-group">
                                   <label class="sr-only" for="f1-first-name">First name</label>
                                   <input type="text" name="f1-first-name" placeholder="First name..."
                                          class="f1-first-name form-control" id="f1-first-name">
                               </div>
                               <div class="form-group">
                                   <label class="sr-only" for="f1-last-name">Last name</label>
                                   <input type="text" name="f1-last-name" placeholder="Last name..."
                                          class="f1-last-name form-control" id="f1-last-name">
                               </div>
                               <div class="form-group">
                                   <label class="sr-only" for="f1-about-yourself">About yourself</label>
                                   <textarea name="f1-about-yourself" placeholder="About yourself..."
                                             class="f1-about-yourself form-control" id="f1-about-yourself"></textarea>
                               </div>
                               <div class="f1-buttons">
                                   <button type="button" class="btn btn-next">Next</button>
                               </div>
                           </fieldset>
       
                           <fieldset>
                               <h4>Set up your account:</h4>
                               <div class="form-group">
                                   <label class="sr-only" for="f1-email">Email</label>
                                   <input type="text" name="f1-email" placeholder="Email..." class="f1-email form-control"
                                          id="f1-email">
                               </div>
                               <div class="form-group">
                                   <label class="sr-only" for="f1-password">Password</label>
                                   <input type="password" name="f1-password" placeholder="Password..."
                                          class="f1-password form-control" id="f1-password">
                               </div>
                               <div class="form-group">
                                   <label class="sr-only" for="f1-repeat-password">Repeat password</label>
                                   <input type="password" name="f1-repeat-password" placeholder="Repeat password..."
                                          class="f1-repeat-password form-control" id="f1-repeat-password">
                               </div>
                               <div class="f1-buttons">
                                   <button type="button" class="btn btn-previous">Previous</button>
                                   <button type="button" class="btn btn-next">Next</button>
                               </div>
                           </fieldset>
       
                           <fieldset>
                               <h4>Social media profiles:</h4>
                               <div class="form-group">
                                   <label class="sr-only" for="f1-facebook">Facebook</label>
                                   <input type="text" name="f1-facebook" placeholder="Facebook..."
                                          class="f1-facebook form-control" id="f1-facebook">
                               </div>
                               <div class="form-group">
                                   <label class="sr-only" for="f1-twitter">Twitter</label>
                                   <input type="text" name="f1-twitter" placeholder="Twitter..."
                                          class="f1-twitter form-control" id="f1-twitter">
                               </div>
                               <div class="form-group">
                                   <label class="sr-only" for="f1-google-plus">Google plus</label>
                                   <input type="text" name="f1-google-plus" placeholder="Google plus..."
                                          class="f1-google-plus form-control" id="f1-google-plus">
                               </div>
                               <div class="f1-buttons">
                                   <button type="button" class="btn btn-previous">Previous</button>
                                   <button type="button" class="btn btn-reset">reset</button>
                                   <button type="submit" class="btn btn-submit">Submit</button>
                               </div>
                           </fieldset>
       
                       </form>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
       <script src="src/js/wizardify.js"></script>
       <script>
           $("#wizard").wizardify({
                   /**
                    * override to not allow or allow next with conditions
                    * @param step
                    * @param fieldSet
                    * @param nextStep
                    * @param nextFieldSet
                    * @returns {boolean} if true the next step will appear, if not then it won't, to switch step asynchronously:  nextStep.trigger("switchTo");
                    */
                   onNext: (step, fieldSet, nextStep, nextFieldSet) => {
                       //  nextStep.trigger("switchTo");  //async
                       return true; //sync
                   },
                   /**
                    * override to not allow or allow previous with conditions
                    * @param step
                    * @param fieldSet
                    * @param nextStep
                    * @param nextFieldSet
                    * @returns {boolean} if true the previous step will appear, if not then it won't, to switch step asynchronously:  nextStep.trigger("switchTo");
                    */
                   onPrevious: (step, fieldSet, nextStep, nextFieldSet) => {
                       //  nextStep.trigger("switchTo");  //async
                       return true; //sync
                   },
                   /**
                    * override to not allow or allow finish with conditions
                    * @returns {boolean}
                    */
                   onFinish: () => {
                       return true;
                   },
                   /**
                    * override to not allow or allow reset with conditions
                    * @returns {boolean}
                    */
                   onReset: () => {
                       return true;
                   },
                   /**
                    * When a step is clicked directly, this method runs, true/false decides wether to allow it.
                    * @param step
                    * @param fieldSet
                    * @param nextStep
                    * @param nextFieldSet
                    * @returns {boolean} if true the clicked step will appear, if not then it won't, to switch step asynchronously:  nextStep.trigger("switchTo");
                    */
                   onStepClick: (step, fieldSet, nextStep, nextFieldSet) => {
                       //  nextStep.trigger("switchTo");  //async
                       return true; //sync
                   },
                   /**
                    * boolean true or false.
                    */
                   rtl: $(document).attr("dir") === "rtl" ? true : false,
                   /**
                    * Steps are clickable and can move around the wizard
                    */
                   stepClickable: true,
                   /**
                    * Jquery animation to use to make the field appear, eg fadeIn , slideDown and others (check jquery docs).
                    */
                   fieldAppearAnimation: "fadeIn",
                   /**
                    * Jquery field appear timeout check jquery documentation for fadeIn and slideDown for more details.
                    */
                   fieldAppearAnimationTimeout: 400,
                   /**
                    * Jquery animation to use to make the field appear, eg fadeOut , slideUp and others (check jquery docs).
                    */
                   fieldDisappearAnimation: "fadeOut",
                   /**
                    * Jquery field appear timeout check jquery documentation for fadeOut and slideUp for more details.
                    */
                   fieldDisappearAnimationTimeout: 400,
               });
       </script>           
    ```
## License
MIT license
## Credits
This project was originally downloaded from:   
https://azmind.com/bootstrap-wizard/   

After downloading this project I fully changed most of the structure and converted it into a jquery plugin.
moreover added many new things such as RTL support, and clickable steps support, reset, events such as onNext onPrevious onReset onSubmit and more.
