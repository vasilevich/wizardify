$.fn.wizardify = function (options) {
    /**
     * returns pertenge
     * @param partialValue
     * @param totalValue
     * @returns {number}
     */
    function percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
    }

    /**
     * scroll to an element
     * @param element_class
     * @param removed_height
     */
    function scroll_to_class(element_class, removed_height) {
        const scroll_to = $(element_class).offset().top - removed_height;
        if ($(window).scrollTop() != scroll_to) {
            $('html, body').stop().animate({scrollTop: scroll_to}, 0);
        }
    }

    /**
     * change bar progress left or right by 1
     * @param direction
     */
    function bar_progress(direction) {
        const number_of_steps = progressLine.data('number-of-steps');
        const now_value = progressLine.data('now-value');
        let new_value = 0;
        if (direction == 'right') {
            new_value = now_value + (100 / number_of_steps);
        }
        else if (direction == 'left') {
            new_value = now_value - (100 / number_of_steps);
        }
        progressLine.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
    }

    /**
     * reset progress bar
     */
    function reset_progress() {
        if (!settings.rtl)
            wizardify.find(".f1-step").first().addClass('active');
        else
            wizardify.find(".f1-step").last().addClass('active');
        progressLine.css("width", defaultProgressWidthCss).data('now-value', defaultProgressWidthData).data("number-of-steps", stepAmount);
    }

    /**
     * reset the wizardify
     */
    function reset() {
        wizardify.find('fieldset').hide();
        wizardify.find(".f1-step").removeClass('active activated');
        wizardify.find('fieldset:' + firtOrLast + ',.f1-steps').fadeIn('slow');
        reset_progress();
    }

    const wizardify = this;
    const settings = $.extend({
        /**
         * override to not allow or allow next with conditions
         * @param step
         * @param fieldSet
         * @param nextStep
         * @param nextFieldSet
         * @returns {boolean}
         */
        onNext: (step, fieldSet, nextStep, nextFieldSet) => {
            return true;
        },
        /**
         * override to not allow or allow previous with conditions
         * @param step
         * @param fieldSet
         * @param nextStep
         * @param nextFieldSet
         * @returns {boolean}
         */
        onPrevious: (step, fieldSet, nextStep, nextFieldSet) => {
            return true;
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
         * @returns {boolean}
         */
        onStepClick: (step, fieldSet, nextStep, nextFieldSet) => {

            return true;
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
    }, options);

    const progressLine = wizardify.find(".f1-progress-line");
    const stepsContainer = wizardify.find(".f1-steps");
    const stepAmount = stepsContainer.find(".f1-step").length;
    const defaultProgressWidthCss = percentage(1, stepAmount * 2) + "%";
    const defaultProgressWidthData = percentage(1, stepAmount * 2);

    if (settings.stepClickable) {
        wizardify.addClass("clickableSteps");
    }
    let firtOrLast = "first";
    if (settings.rtl) {
        wizardify.addClass("rtl");
        firtOrLast = "last";
        stepsContainer.append(stepsContainer.find(".f1-progress"));
        const stepsArr = [];
        stepsContainer
            .children()
            .each(function (i, li) {
                stepsArr.push(li);
                stepsContainer.prepend(li)
            });

        const fieldSetContainer = this.find("fieldset").parent();
        fieldSetContainer.append(stepsContainer);
        fieldSetContainer
            .children()
            .each(function (i, li) {
                fieldSetContainer.prepend(li);
                $(stepsArr[i]).data("fieldSet", $(li));
                $(stepsArr[i]).data("fieldSetIndex", i);
            });
    }

    reset();


    // next step
    wizardify
        .find('.btn-next')
        .on('click', function () {
            // navigation steps / progress steps
            const currentActiveStep = wizardify.find('.f1-step.active');
            const currentFieldSet = $(this).parents('fieldset');
            let nextActiveStep;
            let nextFieldSet;
            if (settings.rtl) {
                nextActiveStep = currentActiveStep.prev();
                nextFieldSet = currentFieldSet.prev();
            }
            else {
                nextActiveStep = currentActiveStep.next();
                nextFieldSet = currentFieldSet.next();
            }
            if (settings.onNext(currentActiveStep, currentFieldSet, nextActiveStep, nextFieldSet) && Math.floor(progressLine.data('now-value')) <= Math.floor(stepAmount * defaultProgressWidthData)) {
                currentFieldSet[settings.fieldDisappearAnimation](settings.fieldDisappearAnimationTimeout, function () {
                    // progress bar
                    bar_progress('right');
                    currentActiveStep.removeClass('active').addClass('activated');
                    nextActiveStep.addClass('active');
                    nextFieldSet[settings.fieldAppearAnimation](settings.fieldAppearAnimationTimeout);
                    // scroll window to beginning of the form
                    scroll_to_class($('.f1'), 20);
                });

            }
        });

    // previous step
    wizardify
        .find('.btn-previous')
        .on('click', function () {
            // navigation steps / progress steps
            const currentActiveStep = wizardify.find('.f1-step.active');
            const currentFieldSet = $(this).parents('fieldset');
            let nextActiveStep;
            let nextFieldSet;
            if (settings.rtl) {
                nextActiveStep = currentActiveStep.next();
                nextFieldSet = currentFieldSet.next();
            }
            else {
                nextActiveStep = currentActiveStep.prev();
                nextFieldSet = currentFieldSet.prev();
            }

            if (settings.onPrevious(currentActiveStep, currentFieldSet, nextActiveStep, nextFieldSet) && Math.floor(progressLine.data('now-value')) > Math.floor(defaultProgressWidthData)) {
                currentFieldSet[settings.fieldDisappearAnimation](settings.fieldDisappearAnimationTimeout, function () {

                    // progress bar
                    bar_progress('left');
                    currentActiveStep.removeClass('active');
                    nextActiveStep.removeClass("activated").addClass('active');
                    nextFieldSet[settings.fieldAppearAnimation](settings.fieldAppearAnimationTimeout);
                    // scroll window to beginning of the form
                    scroll_to_class($('.f1'), 20);
                });
            }
        });

    wizardify
        .find('.btn-reset')
        .on('click', function () {
            if (settings.onReset()) {
                reset();
            }
        });
    if (settings.stepClickable) {
        wizardify
            .find('.f1-step-icon')
            .on('click', function () {
                const currentActiveStep = wizardify.find('.f1-step.active');
                const currentFieldSet = currentActiveStep.data("fieldSet");
                const nextActiveStep = $(this).parents(".f1-step");
                const nextFieldSet = nextActiveStep.data("fieldSet");
                if (settings.onStepClick(currentActiveStep, currentFieldSet, nextActiveStep, nextFieldSet)) {
                    const indexStart = currentActiveStep.data("fieldSetIndex");
                    const indexEnd = nextActiveStep.data("fieldSetIndex");
                    currentFieldSet[settings.fieldDisappearAnimation](settings.fieldDisappearAnimationTimeout, function () {
                        // progress bar
                        if (indexStart < indexEnd) {
                            for (let index = indexStart; index < indexEnd; index++) {
                                bar_progress('right');
                                const step = $(stepsContainer
                                    .find(".f1-step")
                                    .toArray().find(step => $(step).data("fieldSetIndex") == index));
                                step.removeClass('active').addClass('activated');
                            }
                        }
                        else if (indexStart > indexEnd) {
                            for (let index = indexStart; index > indexEnd; index--) {
                                bar_progress('left');
                                const step = $(stepsContainer
                                    .find(".f1-step")
                                    .toArray().find(step => $(step).data("fieldSetIndex") == index));
                                step.removeClass('active activated');
                            }
                        }

                        nextActiveStep.removeClass('activated').addClass('active');
                        nextFieldSet[settings.fieldAppearAnimation](settings.fieldAppearAnimationTimeout);
                        // scroll window to beginning of the form
                        scroll_to_class($('.f1'), 20);
                    });
                }
            });
    }

    // submit
    this
        .on('submit', function (e) {
            if (settings.onFinish()) {
                $(this).find('input[type="text"], input[type="password"], textarea').each(function () {
                    if ($(this).val() == "") {
                        e.preventDefault();
                        $(this).addClass('input-error');
                    }
                    else {
                        $(this).removeClass('input-error');
                    }
                });
            }
        });


    return this;

};