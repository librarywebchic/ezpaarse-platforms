#!/usr/bin/env node

'use strict';
const Parser = require('../.lib/parser.js');

/**
 * Recognizes the accesses to the platform Tumblebooks
 * @param  {Object} parsedUrl an object representing the URL to analyze
 *                            main attributes: pathname, query, hostname
 * @param  {Object} ec        an object representing the EC whose URL is being analyzed
 * @return {Object} the result
 */
module.exports = new Parser(function analyseEC(parsedUrl, ec) {
  let result = {};
  let path   = parsedUrl.pathname;
  // uncomment this line if you need parameters
  let param = parsedUrl.query || {};

  // use console.error for debuging
  // console.error(parsedUrl);

  let match;

  if ((match = /^\/Default.aspx$/i.exec(path)) !== null) {
    // https://www.tumblebooklibrary.com/Default.aspx?ReturnUrl=/TumbleSearch.aspx
    result.rtype    = 'OTHER';
    result.mime     = 'HTML';

    /**
     * unitid is a crucial information needed to filter double-clicks phenomenon, like described by COUNTER
     * it described the most fine-grained of what's being accessed by the user
     * it can be a DOI, an internal identifier or a part of the accessed URL
     * more at http://ezpaarse.readthedocs.io/en/master/essential/ec-attributes.html#unitid
     */
    result.unitid = 'none';

  } else if ((match = /^\/Home.aspx$/i.exec(path)) !== null) {
    // http://parser.skeleton.js/platform/path/to/document-123456-test.html?sequence=1
    result.rtype    = 'OTHER';
    result.mime     = 'HTML';
    result.unitid = 'none';
  } else if ((match = /^\/BooksList.aspx$/i.exec(path)) !== null) {
    // https://www.tumblebooklibrary.com/BooksList.aspx?categoryID=77
    result.rtype    = 'OTHER';
    result.mime     = 'HTML';
    result.unitid = 'none';
  } else if ((match = /^\/TumbleSearch.aspx$/i.exec(path)) !== null) {
    // https://www.tumblebooklibrary.com/TumbleSearch.aspx
    result.rtype    = 'SEARCH';
    result.mime     = 'HTML';
    result.unitid = 'none';
  } else if ((match = /^\/Result.aspx$/i.exec(path)) !== null) {
    // https://www.tumblebooklibrary.com/Result.aspx?m=Title&key=pie
    result.rtype    = 'SEARCH';
    result.mime     = 'HTML';
    result.unitid = 'none';
  } else if ((match = /^\/book.aspx$/i.exec(path)) !== null) {
    // https://www.tumblebooklibrary.com/book.aspx?id=4229
    result.rtype    = 'RECORD';
    result.mime     = 'HTML';
    result.title_id = param.id;
    result.unitid = param.id;
  } else if ((match = /^\/Video.aspx$/i.exec(path)) !== null) {
    // https://www.tumblebooklibrary.com/Video.aspx?ProductID=4229
    result.rtype    = 'BOOK';
    result.mime     = 'HTML';
    result.title_id = param.ProductID;
    result.unitid = param.ProductID;
  } else if ((match = /^\/H5Player.aspx\/$/i.exec(path)) !== null) {
    // https://www.tumblebooklibrary.com/H5Player.aspx/?ProductID=7075&book=%2FH5Books%2FTBLEN%2Fbooks%2Fbabyanimalsplaying%2Fbabyanimalsplaying.json&page=0
    result.rtype    = 'BOOK';
    result.mime     = 'HTML';
    result.title_id = param.ProductID;
    result.unitid = param.ProductID;
  } else if ((match = /^\/ViewOnline.aspx$/i.exec(path)) !== null) {
    // https://www.tumblebooklibrary.com/ViewOnline.aspx?Is5=true&ProductID=6219
    result.rtype    = 'BOOK';
    result.mime     = 'HTML';
    result.title_id = param.ProductID;
    result.unitid = param.ProductID;
  } else if ((match = /^\/H5GamePlayer.aspx\/([^/]+)$/i.exec(path)) !== null) {
    // https://www.tumblebooklibrary.com/H5GamePlayer.aspx/match-the-sentence?ProductID=7247&game=%2FH5Games%2FMatchSentence%2FTBLEN%2FAbraCadabraAndTheToothWitchSentenceGame.json
    result.rtype    = 'BOOK';
    result.mime     = 'HTML';
    result.title_id = param.ProductID;
    result.unitid = param.ProductID;
  } else if ((match = /^\/RAPlayer.aspx$/i.exec(path)) !== null) {
    // https://www.tumblebooklibrary.com/RAPlayer.aspx?ProductID=5791
    result.rtype    = 'BOOK';
    result.mime     = 'HTML';
    result.title_id = param.ProductID;
    result.unitid = param.ProductID;
  }
  

  return result;
});
