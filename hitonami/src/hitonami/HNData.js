var hn = hn || {};

/**
 * @class Data
 */
function __HNRefData() {

	this.setZero = function() {
		return this.__hndata._setZero();
	};

	/**
	 * @method clear
	 */
	this.clear = function() {
		return this.__hndata._clear();
	};

	/**
	 * @method equal
	 * @param {hn::HNRefData}
	 *          arg0
	 * @return {bool}
	 */
	this.equal = function(hndata) {
		if (hndata == null)
			return false;
		return this.__hndata._equal(hndata.__hndata);
	};

	/**
	 * @method getSize
	 * @return {int}
	 */
	this.getSize = function() {
		return this.__hndata._getSize();
	};

	/**
	 * @method isEmpty
	 * @return {bool}
	 */
	this.isEmpty = function() {
		return this.__hndata._isEmpty();
	};

	/**
	 * @method copy
	 * @param {hn::HNRefData}
	 *          arg0
	 */
	this.copy = function(hndata) {
		return this.__hndata._copy(hndata.__hndata);
	};

	/**
	 * @method toBase64
	 * @return {String}
	 */
	this.toBase64 = function() {
		return this.__hndata._toBase64();
	};

	/**
	 * @method toHex
	 * @return {String}
	 */
	this.toHex = function() {
		return this.__hndata._toHex();
	};

	this.mid = function(offset,len) {
		return hn.Data._fromHNRefData(this.__hndata._mid(offset,len));
	};

	this.__hndata = new __hn.HNRefData();
	
};

hn.Data = __HNRefData;

/**
 * @method fromHex
 * @param {String}
 *          arg0
 * @return {hn::HNRefData}
 */
hn.Data.fromHex = function(str) {
	return hn.Data._fromHNRefData( __hn.HNRefData._fromHex(str) );
};

/**
 * @method fromFile
 * @param {String}
 *          arg0
 * @return {hn::HNRefData}
 */
hn.Data.fromFile = function(str) {
	return hn.Data._fromHNRefData( __hn.HNRefData._fromFile(str) );
};

/**
 * @method fromBase64
 * @param {String}
 *          arg0
 * @return {hn::HNRefData}
 */
hn.Data.fromBase64 = function(str) {
	return hn.Data._fromHNRefData( __hn.HNRefData._fromBase64(str) );
};

hn.Data._fromHNRefData = function(hndata){
	if (hndata == null)
		return null;
	var ret = new hn.Data();
	ret.__hndata = hndata;
	return ret;
}
