===================
Web Widget Dot Zero
===================

.. |badge1| image:: https://img.shields.io/badge/licence-LGPL--3-blue.png
    :target: http://www.gnu.org/licenses/lgpl-3.0-standalone.html
    :alt: License: LGPL-3

|badge1|

This module implements a widget to handle char fields splitted in chunks and separated by a custom separator and filled
by a custom char.

Usage
=====

*chunks* are sections of the input string splitted by a delimiter.
*fill* is the char used to fill single chunks when needed.

.. code-block:: xml

    <field name="some_field" widget="dotzero" chunks="2.3.4" fill="0"/>

So an input like *5.7.4* will be parsed into *05.007.0004* value.

*chunks* delimiters are the same used in parsing final value but you can use delimeters in random position.

So, for example:

.. code-block:: xml

    <field name="some_field" widget="dotzero" chunks="2.3,4;5" fill="+"/>

will parse an input value such as *A;B.C,D* into a final value like this: *+A.++B,+++C;++++D*


Defaults are:

.. code-block:: xml

    <field name="some_field" widget="dotzero" chunks="3.3.3" fill="0"/>

Known issues / Roadmap
======================

* Beware of changing *chunks* and/or *fill* of a field after you have already populated your table: it might cause weird behavior in parsing this field.
* ``Web Widget Dot Zero`` is not supported in tree views.
            

Bug Tracker
===========

You can track bugs or issues on its related `GitHub Issues <https://github.com/bluebytech/web_widget_dot_zero/issues>`_.

Credits
=======

Authors
~~~~~~~

* admin@bluebytech.com

Contributors
~~~~~~~~~~~~

Maintainers
~~~~~~~~~~~

BLUEBYTECH maintains this module.

.. image:: https://www.bluebytech.com/wp-content/uploads/2020/01/new-logo-250.png
   :alt: BLUEBYTECH
   :target: https://www.bluebytech.com
