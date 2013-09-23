var PhoneCheck = function (cellEl, cellCountrycodeEl, numberType){
	this.cellEl = cellEl;
	this.cellCountrycodeEl = cellCountrycodeEl;

	// Check if the phone number type is supplied
	// and supported by library. Default to fixed line or mobile.
	numberType = numberType ? numberType.toUpperCase() : '';
	if(numberType in i18n.phonenumbers.PhoneNumberType){
		this.numberType = numberType;
	} else {
		this.numberType = 'FIXED_LINE_OR_MOBILE';
	}

	// Bind handlers to input/select events.
	this.setEventListeners();
	this.phoneLib = i18n.phonenumbers.PhoneNumberUtil.getInstance();

	// Set the initial country code placeholder for the current country.
	this.setPlaceholder();

	return this;
}

PhoneCheck.prototype.setEventListeners = function(){
	// Validate the input on every key up event in the phone field.
	$(this.cellEl).on('keyup change', $.proxy(this.validate, this));
	$(this.cellEl).on('keydown', $.proxy(this.cursorStay, this));

	// Reset the country code placeholder when a new country
	// is selected.
	$(this.cellCountrycodeEl).on('change', $.proxy(this.setPlaceholder, this));
}

PhoneCheck.prototype.cursorStay = function(e){
	// Guard against a jumping cursor if the user is trying to erase
	// the country code.
	if(e.which == 8 && (this.cellEl.data('countryCode') == e.target.value)){
		e.preventDefault();
	}
}

PhoneCheck.prototype.getExample = function(){
	// Grab an example number of the type specified (whether fixed or mobile, etc...)
	var example = this.phoneLib.getExampleNumberForType(this.country(), i18n.phonenumbers.PhoneNumberType[this.numberType]);

	// If an example number is available, return its parts.
	// Otherwise return false.
	if(example && example.values_){
		return example.values_;
	}
	return false;
}

PhoneCheck.prototype.validate = function(evt){
	var formattedPhone, naiveCountryForNumber;
	this.countryCode = this.country();

	// Check if field is empty/default
	if(this.cell() == this.cellEl.data('countryCode')){
		this.makeFieldValid();
		return;
	}
	// Check if the input's length is shorter than the country code placeholder
	// If it is, remove all validation classes and enforce the country code.
	else if(this.cell().length < this.cellEl.data('countryCode').length){
		this.makeFieldValid();
		this.setPlaceholder();
		return;

	}
	// Check for invalid characters in the input.
	 else if(!this.isValidChars(evt)){
		this.makeFieldValid(false);
		return;
	}

	// In the event that there's no reference
	// example number for the country then
	// just allow the input value.
	if(!this.exampleForCountry){
		this.makeFieldValid(true);
		return;
	}

	formattedPhone = formatE164(this.country(), cleanPhone(this.cell()));

	// Get the library's guess at country for the number input.
	naiveCountryForNumber = countryForE164Number(formattedPhone);

	try {
		// Remove non-numeric characters and attempt to parse
		// an instance of the number for the selected country.
		var numberProto = this.phoneLib.parse(this.cell().replace(/[^0-9]/,''), this.country());

		if (this.country().toLowerCase() === naiveCountryForNumber.toLowerCase()
			&& this.phoneLib.isValidNumber(numberProto)
		) {
			this.makeFieldValid(true);
			return;
		}

	} catch (e) {
		// Uncomment the line below to view exceptions raised by the 
		// phone library.

		// console.log(e);
	}

	// Since the number hasn't been validated at this point,
	// it's assumed invalid.
	this.makeFieldValid(false);
	return;
}

PhoneCheck.prototype.setPlaceholder = function(){
	this.exampleForCountry = this.getExample(),
		countryCode = '+ ';

	if(this.exampleForCountry){
		countryCode += this.exampleForCountry['1'] + ' ';
	}

	this.cellEl.data('countryCode', countryCode);
	this.cellEl.val(countryCode);
	this.validate();
}

// Determine if the characters in the input are 
// valid phone number characters.
PhoneCheck.prototype.isValidChars = function(evt){
	// Create a pattern that will match invalid characters:
	// ie, anything that is not 0-9, '-', '(', ')', '-', '+', '.'
	// or spaces.
	var invalidPattern = new RegExp(/[^0-9\(\)\-\+\s\.]/g);

	// Check for invalid characters. Return false if found.
	// Return true otherwise.
	if(invalidPattern.test(this.cellEl.val())){
		return false;
	}
	else
	{
		return true;
	}
}

// Quick accessor to get input field's value.
PhoneCheck.prototype.cell = function(){
	return this.cellEl.val();
}

// Quick accessor to get selected country's value.
PhoneCheck.prototype.country = function(){
	return this.cellCountrycodeEl.val();
}

// Add/Remove the relevant resulting validation classes.
PhoneCheck.prototype.makeFieldValid = function(isValid){
	if(typeof isValid != 'undefined'){
		this.cellEl.toggleClass('pc-valid', isValid).toggleClass('pc-invalid', !isValid);
	} else {
		this.cellEl.toggleClass('pc-valid pc-invalid', false);
	}
}