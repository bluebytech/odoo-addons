/* Copyright 2018 Simone Orsi - Camptocamp SA
License LGPLv3.0 or later (https://www.gnu.org/licenses/lgpl-3.0.en.html). */

odoo.define('web_widget_dot_zero', function (require) {
    "use strict";

    let field_registry = require('web.field_registry');
    let basic_fields = require('web.basic_fields');

    let FieldDotZero = basic_fields.InputField.extend({
        className: 'o_field_dotzero',
        supportedFieldTypes: ['char'],
        tagName: 'span',

        /**
         * @constructor
         */
        init: function () {
            this._super.apply(this, arguments);

            let node = this.attrs;
            this.chunks = node.chunks && node.chunks.split(/\D/) || [3, 3, 3];
            this.seps = node.chunks && node.chunks.split(/\d/) || ['', '.', '.', ''];
            this.fill = node.fill && node.fill[0] || '0';
        },

        /**
         * Parses input value into final value according to this.chunks and this.fill vars.
         *
         * E.g.: 1.2.3 -> 010020003
         *
         * @param value
         * @returns {string}
         * @private
         */
        _parseValue: function (value) {
            let s = '';
            let val = this.$input.val();
            if (val.length > 0) {
                // INFO: splits field value into chunks by delimeter loads in the init.
                let sa = val.split(new RegExp('['+this.seps+']'));
                sa.forEach(function (ns, i) {
                    if (i < this.chunks.length) {
                        let l = this.chunks[i] - ns.length;
                        if (l > 0)
                            // INFO: fills chunk with this.fill char.
                            s = s.concat(this.fill.repeat(l) + ns)
                        else
                            // INFO: cuts chunk if it's bigger than chunk length.
                            s = s.concat(ns.substr(-l));
                    }
                }, this);
            }
            return s;
        },

        /**
         * Parses field value into the input one user expects according to this.chunks and this.fill vars.
         *
         * E.g.: 010020003 -> 1.2.3
         *
         * @param $input
         * @returns {*|jQuery.fn.init|jQuery|HTMLElement}
         * @private
         */
        _prepareInput: function ($input) {
            this.$input = $input || $("<input/>");
            this.$input.addClass('o_input');

            let inputAttrs = { placeholder: this.attrs.placeholder || "" };
            let inputVal;
            if (this.nodeOptions.isPassword) {
                inputAttrs = _.extend(inputAttrs, { type: 'password', autocomplete: 'new-password' });
                inputVal = this.value || '';
            } else {
                inputAttrs = _.extend(inputAttrs, { type: 'text', autocomplete: this.attrs.autocomplete });
                inputVal = this._formatValue(this.value);
            }
            this.$input.attr(inputAttrs);

            let s = '';
            if (inputVal.length > 0) {
                let si = 0;
                this.chunks.forEach(function (nz, i, chunks) {
                    nz = parseInt(nz);

                    // INFO: trims this.fill chars with empty ones.
                    s = s.concat(inputVal.substr(si, nz).replace(new RegExp('^['+this.fill+']+', 'g'), ''));

                    si += nz;
                    if (i < chunks.length - 1) {
                        // INFO: concats using delimeters loaded into the init.
                        s = s.concat(this.seps[i+1]);
                    }
                }, this);
            }
            this.$input.val(s);

            return this.$input;
        },
    });

    field_registry.add('dotzero', FieldDotZero);

    return {
        FieldDotZero: FieldDotZero,
    };
});
