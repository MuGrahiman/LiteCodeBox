
// ================== Utilities ==================
const $ = ( s ) => document.querySelector( s );
const $$ = ( s ) => Array.from( document.querySelectorAll( s ) );
const out = $( '#output' );
const preview = $( '#preview' );
const STORAGE_KEY = 'lite-code-box-storage-key';

const escapeHtml = s =>
    String( s ).replace( /[&<>"]/g, c => ( {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
    }, [ c ] ) );

const log = ( msg, type = 'info' ) => {
    const color = type === 'error' ?
        'var(--err)' : type === 'warn' ?
            'var(--warn)' : 'var(--brand)';

    const time = new Date().toLocaleTimeString();

    const line = document.createElement( 'div' );

    line.innerHTML =
        `<span style='color: ${ color }'>[${ time }]</span> ${ escapeHtml( msg ) }`;

    out.appendChild( line );
    out.scrollTop = out.scrollHieght;
}

const clearOut = () => out.innerHTML = '';

$( '#clearOut' )?.addEventListener( 'click', clearOut );

// ================== ACE Editors (HTML/CSS/JS) ==================
const makeEditor = ( id, mode ) => {
    const ed = ace.edit( id, {
        theme: 'ace/theme/dracula',
        mode,
        tabSize: 2,
        useSoftTabs: true,
        navigateWithinSoftTabs: true,
        showPrintMargin: false,
        highlightActiveLine: true,
        enableAutoIndent: true,
        enableKeyboardAccessibility: true,
        wrap: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,

    } );

    ace.config.loadModule( "ace/ext/elastic_tabstops_lite", function () {
        ed.setOption( "useElasticTabstops", true );
    } );

    ed.session.setUseWrapMode( true );

    ed.commands.addCommand( {
        name: 'run',
        bindKey: {
            win: 'Ctrl-Enter',
            mac: 'Command-Enter',
        },
        exec () { runWeb( false ); }
    } );

    ed.commands.addCommand( {
        name: 'save',
        bindKey: {
            win: 'Ctrl-S',
            mac: 'Command-S',
        },
        exec () { saveProject(); }
    } );

    return ed
}

const ed_html = makeEditor(
    'ed_html', 'ace/mode/html'
);

const ed_css = makeEditor(
    'ed_css', 'ace/mode/css'
);

const ed_js = makeEditor(
    'ed_js', 'ace/mode/javascript'
);

// ================== Tabs (robust + a11y) ==================

const TAB_ORDERS = [ 'html', 'css', 'js' ];

const wraps = Object.fromEntries(
    $$( '#webEditors .editor-wrap' )
        .map( w => [ w.dataset.pane, w ] ) );

const editors = {
    html: ed_html,
    css: ed_css,
    js: ed_js
};

const activePane = () => {
    const t = $( '#webTabs .tab .active' );
    return t ? t.dataset.pane : 'html';
};

const showPane = ( name ) => {
    TAB_ORDERS.forEach( k => {
        if ( wraps[ k ] ) {
            wraps[ k ].hidden = ( k !== name );
        }
    } )

    $$( '#webTabs .tab' ).forEach( t => {
        const on = t.dataset.pane === name;
        t.classList.toggle( 'active', on );
        t.setAttribute( 'aria-selected', on );
        t.tabIndex = on ? 0 : -1;
    } );

    requestAnimationFrame( () => {
        const ed = editors[ name ];
        if ( ed && ed.resize ) {
            ed.resize( true );
            ed.focus();
        };
    } );
};

$( '#webTabs' )?.addEventListener( 'click', ( e ) => {
    const btn = e.target.closest( '.tab' );
    if ( !btn ) return;

    showPane( btn.dataset.pane );
} );

$( '#webTabs' )?.addEventListener( 'keydown', ( e ) => {
    const idx = TAB_ORDERS.indexOf( activePane() );
    if ( e.key === 'ArrowRight' || e.key === 'ArrowLeft' ) {
        const delta = e.key === 'ArrowLeft' ? -1 : 1;
        showPane( TAB_ORDERS[ ( idx + delta + TAB_ORDERS.length ) % TAB_ORDERS.length ] );
        e.preventDefault();

    };
} );

showPane( 'html' );

// ================== Preview ==================

const buildWebSrcdoc = ( withTest = false ) => {
    const html = ed_html.getValue();
    const css = ed_css.getValue();
    const js = ed_js.getValue();

    const test = ( $( '#testArea' )?.value || '' ).trim();

    return `<!DOCTYPE html>
        <html lang="en" dir="ltr">
            <head>
	            <meta charset="UTF-8">
	            <meta name="viewport" content="width=device-width, initial-scale=1.0">
	            <style>${ css }\n</style>
            </head>
            <body>
	            ${ html }
                <script>
                    try {
                        ${ js }
                        ${ withTest && test ? `\n/*test */\n${ test }` : '' }
        
                    } catch (error) {
                        console.error(error);
        
                    }
                </script>
            </body>
        </html>
    `
}

const runWeb = ( withTest = false ) => {
    preview.srcdoc = buildWebSrcdoc( withTest )
    log( withTest ? ' Run with tests' : 'Web preview updated.' );
};
$( '#runWeb' )?.addEventListener( 'click', () => runWeb( false ) );
$( '#runTests' )?.addEventListener( 'click', () => runWeb( true ) );
$( '#openPreview' )?.addEventListener( 'click', () => {
    const src = buildWebSrcdoc( false );
  const w = window.open('about:blank');

    w.document.open();
    w.document.write(src);
    w.document.close();
} );

// ================== Save / Load (Web-only) ==================

const projectJson = () => {
    return {
        version: 1,
        kind: 'web-only',
        assignment: $( '#assignment' )?.value || '',
        test: $( '#testArea' )?.value || '',
        html: ed_html.getValue(),
        css: ed_css.getValue(),
        js: ed_js.getValue(),
    };
};


const loadProject = ( obj ) => {
    try {
        if ( $( '#assignment' ) ) $( '#assignment' ).value = obj.assignment || '';
        if ( $( '#testArea' ) ) $( '#testArea' ).value = obj.test || '';

        ed_html.setValue( obj.html || '', -1 );
        ed_css.setValue( obj.css || '', -1 );
        ed_js.setValue( obj.js || '', -1 );
        log( 'Web project loaded.' )
    }
    catch ( error ) {
        log( 'Unable to load project:' + error, "error" );
    }
}

const setDefaultContent = () => {
    ed_html.setValue( `<!-- Write your html code here.. -->`, -1 );
    ed_css.setValue( `/* Write your css code here..*/`, -1 );
    ed_js.setValue( `// Write your js code here..`, -1 );
};

const saveProject = () => {
    try {
        const data = JSON.stringify( projectJson(), null, 2 );
        localStorage.setItem( STORAGE_KEY, data );
        const blob = new Blob( [ data ], { type: 'application/json' } );
        const a = document.createElement( 'a' );
        a.href = URL.createObjectURL( blob );
        a.download = 'lite-code-box.json';
        a.click();
        log( 'Save locally and downloaded as JSON file' );

    } catch ( error ) {
        log( 'Unable to save: ' + error, 'error' );
    }
};

$( '#saveBtn' )?.addEventListener( 'click', saveProject );
$( '#loadBtn' )?.addEventListener( 'click', () => $( '#openFile' ).click() );
$( '#openFile' )?.addEventListener( 'change', async ( e ) => {
    const f = e.target.files?.[ 0 ];

    if ( !f ) return;

    try {
        const obj = JSON.parse( await f.text() );
        loadProject( obj );
    } catch ( error ) {
        log( 'Invalid Project File ' + error, 'error' );
    };
} );
// ================== Initial load ==================
try {
    const cache = localStorage.getItem( STORAGE_KEY );

    if ( cache ) {
        loadProject( JSON.parse( cache ) );
    } else {
        setDefaultContent();
    }
} catch ( error ) {
    setDefaultContent();
        log( 'Initial load error: ' + error, 'error' );

};

log( 'Ready - Web only Editor ( HTML / CSS / JS ) ✨' );

function normalizeProject(raw){
  if (!raw || typeof raw !== 'object') throw new Error('Not an object');

  // accept old/new shapes; fall back to empty strings
  const html = typeof raw.html === 'string' ? raw.html : (raw.web && raw.web.html) || '';
  const css  = typeof raw.css  === 'string' ? raw.css  : (raw.web && raw.web.css ) || '';
  const js   = typeof raw.js   === 'string' ? raw.js   : (raw.web && raw.web.js  ) || '';

  return {
    version: 1,
    kind: 'web-only',
    assignment: typeof raw.assignment === 'string' ? raw.assignment : (raw.task || ''),
    test:       typeof raw.test       === 'string' ? raw.test       : (raw.tests || ''),
    html, css, js
  };
}

function safeSetValue(id, val){
  const el = document.getElementById(id);
  if (el) { el.value = val; }
  else { log(`Warning: #${id} not found; skipped setting value`, 'warn'); }
}

function rawLoadProject(raw){
  const proj = normalizeProject(raw);
  safeSetValue('assignment', proj.assignment);
  safeSetValue('testArea',   proj.test);
  if (typeof ed_html?.setValue === 'function') ed_html.setValue(proj.html, -1);
  if (typeof ed_css?.setValue  === 'function') ed_css.setValue(proj.css, -1);
  if (typeof ed_js?.setValue   === 'function') ed_js.setValue(proj.js, -1);
  log('Project loaded.');
}



// ===== Initial restore (after DOM is parsed) =====
window.addEventListener('DOMContentLoaded', () => {
  try{
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const obj = JSON.parse(cached);
      rawLoadProject(obj);
    } else {
      // seed defaults if nothing cached
      if (!document.getElementById('assignment')) return;
      // your default seeding function if you have one:
      // setDefaultContent();
    }
  }catch(e){
    log('Skipping auto-restore: ' + e, 'warn');
  }
});