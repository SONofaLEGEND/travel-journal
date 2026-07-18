/* ============================================
   SHARED CHROME — cursor, preloader, hamburger
   (self-contained here since this page doesn't load script.js)
============================================ */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});
function animateRing(){
  ringX += (mouseX - ringX) * 0.16;
  ringY += (mouseY - ringY) * 0.16;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();
function bindHoverTargets(){
  document.querySelectorAll('[data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });
}
bindHoverTargets();

document.getElementById('preloader').style.clipPath = 'circle(150% at 50% 50%)';
window.addEventListener('load', () => {
  const fill = document.getElementById('preloaderFill');
  const pre = document.getElementById('preloader');
  fill.style.transition = 'width 1s ease';
  requestAnimationFrame(() => { fill.style.width = '100%'; });
  setTimeout(() => {
    pre.style.transition = 'clip-path .9s cubic-bezier(.65,0,.35,1)';
    pre.style.clipPath = 'circle(0% at 50% 50%)';
    setTimeout(() => { pre.style.display = 'none'; }, 950);
  }, 1050);
});

const hamburger = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menuOverlay');
let menuOpen = false;
hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  hamburger.classList.toggle('open', menuOpen);
  menuOverlay.classList.toggle('open', menuOpen);
});
document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    hamburger.classList.remove('open');
    menuOverlay.classList.remove('open');
  });
});

/* ============================================
   TRIP DATA
   Edit this: each country key holds an array of trips.
   `link` should eventually point at that trip's dedicated page.
============================================ */
const tripData = {
  INDIA: [
  {
    place: 'CHENNAI',
    title: 'Where Every Journey Begins',
    link: 'trips/india-chennai.html'
  },
  {
    place: 'VARKALA',
    title: 'Clifftops, Sunsets & Arabian Sea Dreams',
    link: 'trips/india-varkala.html'
  },
  {
    place: 'KONKAN COAST',
    title: 'Chasing the Monsoon Along India\'s Wildest Coast',
    link: 'trips/india-konkan.html'
  },
  {
    place: 'WESTERN GHATS',
    title: 'Into the Emerald Mountains',
    link: 'trips/india-western-ghats.html'
  },
  {
    place: 'HOYSALA HEARTLANDS',
    title: 'Among Forgotten Empires of Stone',
    link: 'trips/india-hoysala.html'
  },
  {
    place: 'YERCAUD',
    title: 'Campfires Above the Clouds',
    link: 'trips/india-yercaud.html'
  },
  {
    place: 'MEESAPULIMALA',
    title: 'Walking the Roof of South India',
    link: 'trips/india-meesapulimala.html'
  },
  {
    place: 'TADIANDAMOL',
    title: 'The Summit Beyond the Coffee Forests',
    link: 'trips/india-tadiandamol.html'
  },
  {
    place: 'ANDAMAN ISLANDS',
    title: 'Turquoise Horizons at the Edge of India',
    link: 'trips/india-andaman.html'
  }
],

  UAE: [
    {
      place: 'DUBAI',
      title: 'A Layover Worth Remembering',
      link: 'trips/uae-dubai.html'
    }
  ],

  IRELAND: [
    {
      place: 'DUBLIN',
      title: 'Dublin Escapades',
      link: 'trips/ireland-dublin.html'
    },
    {
      place: 'DINGLE PENINSULA',
      title: 'Where the Atlantic Writes the Weather',
      link: 'trips/ireland-dingle.html'
    },
    {
      place: 'ATHLONE',
      title: 'At the Heart of Ireland',
      link: 'trips/ireland-athlone.html'
    },
    {
      place: 'KILKENNY',
      title: 'Ireland\'s Medieval Masterpiece',
      link: 'trips/ireland-kilkenny.html'
    },
    {
      place: 'GALWAY',
      title: 'Music, Rain & Wild Atlantic Streets',
      link: 'trips/ireland-galway.html'
    }
  ],

  'SRI LANKA': [
    {
      place: 'SRI LANKA',
      title: 'Around the Pearl of the Indian Ocean',
      link: 'trips/sri-lanka.html'
    }
  ],

  POLAND: [
    {
      place: 'CENTRAL EUROPE',
      title: 'Backpacking Through the Heart of Europe',
      link: 'trips/central-europe.html'
    }
  ],

  CZECH: [
    {
      place: 'CENTRAL EUROPE',
      title: 'Backpacking Through the Heart of Europe',
      link: 'trips/central-europe.html'
    }
  ],

  AUSTRIA: [
    {
      place: 'CENTRAL EUROPE',
      title: 'Backpacking Through the Heart of Europe',
      link: 'trips/central-europe.html'
    }
  ],

  SLOVAKIA: [
    {
      place: 'CENTRAL EUROPE',
      title: 'Backpacking Through the Heart of Europe',
      link: 'trips/central-europe.html'
    }
  ],

  HUNGARY: [
    {
      place: 'CENTRAL EUROPE',
      title: 'Backpacking Through the Heart of Europe',
      link: 'trips/central-europe.html'
    }
  ],

  BHUTAN: [
    {
      place: 'BHUTAN',
      title: 'The Last Himalayan Kingdom',
      link: 'trips/bhutan.html'
    }
  ]
};

/* lat/lon per country (approx centre) */
const countryCoords = {
  INDIA:      { lat: 20.59, lon: 78.96 },
  UAE:        { lat: 23.42, lon: 53.85 },
  IRELAND:    { lat: 53.14, lon: -7.69 },
  'SRI LANKA':{ lat: 7.87,  lon: 80.77 },
  POLAND:     { lat: 51.92, lon: 19.15 },
  CZECH:      { lat: 49.82, lon: 15.47 },
  AUSTRIA:    { lat: 47.52, lon: 14.55 },
  SLOVAKIA:   { lat: 48.67, lon: 19.70 },
  HUNGARY:    { lat: 47.16, lon: 19.50 },
  BHUTAN:      { lat: 27.51, lon: 90.43 }
};

document.getElementById('legendCount').textContent =
  String(Object.keys(countryCoords).length).padStart(2, '0');

/* ============================================
   THREE.JS GLOBE
============================================ */
const canvasWrap = document.getElementById('globeCanvas');
const tooltip = document.getElementById('tooltip');
const hint = document.getElementById('globeHint');
const panel = document.getElementById('tripPanel');
const panelCountry = document.getElementById('panelCountry');
const cardList = document.getElementById('tripCardList');
const panelClose = document.getElementById('panelClose');

const RADIUS = 2.1;
let scene, camera, renderer, globeGroup, markers = [];
let width = window.innerWidth, height = window.innerHeight;

function initScene(){
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
  fitCamera();

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.setClearColor(0x0a0a0a, 1);
  canvasWrap.appendChild(renderer.domElement);

  globeGroup = new THREE.Group();
  globeGroup.rotation.x = 0.18;
  // On mobile the heading is compact so we need less downward shift
  const isMobile = width < 860;
  globeGroup.position.y = isMobile ? -0.18 : -0.5;
  scene.add(globeGroup);


  // lights so the sphere reads as a lit 3D form, not a flat black disc
  const key = new THREE.DirectionalLight(0xf4ecd8, 1.1);
  key.position.set(-4, 2.5, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xc9a24b, 0.5);
  rim.position.set(4, -1, -3);
  scene.add(rim);
  scene.add(new THREE.AmbientLight(0x2a2620, 1.4));

  buildGlobeCore();
  buildAtmosphere();
  buildGraticule();
  buildStipple();
  buildMarkers();
  buildCountryOutlines();
}

/* frame the globe consistently regardless of viewport aspect ratio */
function fitCamera(){
  const fovRad = camera.fov * (Math.PI / 180);
  const fitHeightDist = RADIUS / Math.tan(fovRad / 2);
  const fitWidthDist = fitHeightDist / camera.aspect;
  camera.position.set(0, 0, Math.max(fitHeightDist, fitWidthDist) * 1.95);
}

/* solid inner sphere, lit — visibly lighter than the page background
   so the globe reads as a shape instead of vanishing into it */
function buildGlobeCore(){
  const geo = new THREE.SphereGeometry(RADIUS * 0.985, 64, 48);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x1c1a15, roughness: 0.85, metalness: 0.1
  });
  const core = new THREE.Mesh(geo, mat);
  globeGroup.add(core);
}

/* a dense stippled dot-field across the whole surface — this is what
   makes it read as a populated globe rather than empty wireframe */
function buildStipple(){
  const count = 1500;
  const positions = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++){
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    const v = new THREE.Vector3(x, y, z).multiplyScalar(RADIUS * 1.002);
    positions[i * 3] = v.x;
    positions[i * 3 + 1] = v.y;
    positions[i * 3 + 2] = v.z;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: 0xcfc6ac, size: 0.016, sizeAttenuation: true,
    transparent: true, opacity: 0.3, depthTest: true
  });
  const points = new THREE.Points(geo, mat);
  globeGroup.add(points);
}

/* ============================================
   REAL COUNTRY BORDER OUTLINES
   Fetches actual world boundary data (Natural Earth,
   via the world-atlas package) at runtime and draws every
   country's coastline/border as thin lines on the sphere.
   Requires the browser to have internet access when the
   page loads — this is real geographic data, not decoration.
============================================ */
async function buildCountryOutlines(){
  try {
    const res = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    if (!res.ok) throw new Error('Network response was not ok: ' + res.status);
    const topology = await res.json();

    if (typeof topojson === 'undefined'){
      throw new Error('topojson-client failed to load');
    }
    const geo = topojson.feature(topology, topology.objects.countries);

    const positions = [];
    geo.features.forEach(feature => {
      const geom = feature.geometry;
      if (!geom) return;
      const polygons = geom.type === 'Polygon' ? [geom.coordinates]
                      : geom.type === 'MultiPolygon' ? geom.coordinates
                      : [];
      polygons.forEach(polygon => {
        polygon.forEach(ring => {
          for (let i = 0; i < ring.length; i++){
            const [lon1, lat1] = ring[i];
            const [lon2, lat2] = ring[(i + 1) % ring.length];
            const p1 = latLonToVector3(lat1, lon1, RADIUS * 1.006);
            const p2 = latLonToVector3(lat2, lon2, RADIUS * 1.006);
            positions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
          }
        });
      });
    });

    const outlineGeo = new THREE.BufferGeometry();
    outlineGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const outlineMat = new THREE.LineBasicMaterial({
      color: 0xe9dfc0, transparent: true, opacity: 0.5
    });
    const outlines = new THREE.LineSegments(outlineGeo, outlineMat);
    globeGroup.add(outlines);
  } catch (err){
    console.warn('Country borders failed to load (needs an internet connection at page load):', err);
    hint.textContent = 'borders failed to load — check your connection and refresh';
  }
}

/* gold fresnel rim glow using a simple custom shader */
function buildAtmosphere(){
  const geo = new THREE.SphereGeometry(RADIUS * 1.05, 64, 48);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    uniforms: { glowColor: { value: new THREE.Color(0xc9a24b) } },
    vertexShader: `
      varying vec3 vNormal;
      void main(){
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      uniform vec3 glowColor;
      void main(){
        float intensity = pow(0.66 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.1);
        gl_FragColor = vec4(glowColor, intensity * 0.85);
      }
    `
  });
  const atmo = new THREE.Mesh(geo, mat);
  globeGroup.add(atmo);
}

/* latitude/longitude wireframe grid (drawn as line loops, not a solid mesh) */
function buildGraticule(){
  const material = new THREE.LineBasicMaterial({ color: 0xf4f2ea, transparent: true, opacity: 0.32 });
  const goldMaterial = new THREE.LineBasicMaterial({ color: 0xc9a24b, transparent: true, opacity: 0.55 });

  // latitude rings
  for (let lat = -60; lat <= 60; lat += 20) {
    const points = [];
    for (let lon = 0; lon <= 360; lon += 4) {
      points.push(latLonToVector3(lat, lon, RADIUS * 1.001));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    globeGroup.add(new THREE.Line(geo, lat === 0 ? goldMaterial : material));
  }
  // longitude rings
  for (let lon = 0; lon < 360; lon += 30) {
    const points = [];
    for (let lat = -90; lat <= 90; lat += 4) {
      points.push(latLonToVector3(lat, lon, RADIUS * 1.001));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    globeGroup.add(new THREE.Line(geo, material));
  }
}

function latLonToVector3(lat, lon, radius){
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/* soft glow dot texture generated on a canvas, used for marker sprites */
function makeGlowTexture(){
  const size = 128;
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const ctx = c.getContext('2d');
  const grad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  grad.addColorStop(0, 'rgba(233,205,140,1)');
  grad.addColorStop(0.35, 'rgba(201,162,75,0.9)');
  grad.addColorStop(1, 'rgba(201,162,75,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}

function buildMarkers(){
  const glowTex = makeGlowTexture();

  Object.entries(countryCoords).forEach(([name, coord]) => {
    const pos = latLonToVector3(coord.lat, coord.lon, RADIUS * 1.012);

    const spriteMat = new THREE.SpriteMaterial({
      map: glowTex, transparent: true, depthTest: true, blending: THREE.AdditiveBlending
    });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.position.copy(pos);
    sprite.scale.set(0.16, 0.16, 1);
    sprite.userData = { country: name, baseScale: 0.16 };
    globeGroup.add(sprite);
    markers.push(sprite);

    // tiny solid core dot so it reads sharply even before the glow
    const dotGeo = new THREE.SphereGeometry(0.022, 10, 10);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xf4ecd8 });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.copy(pos);
    globeGroup.add(dot);
  });
}

initScene();

/* ============================================
   RESIZE
============================================ */
window.addEventListener('resize', () => {
  width = window.innerWidth; height = window.innerHeight;
  camera.aspect = width / height;
  fitCamera();
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  // Re-apply mobile offset on orientation change
  globeGroup.position.y = width < 860 ? -0.18 : -0.5;
});

/* ============================================
   DRAG TO ROTATE + AUTO ROTATE
============================================ */
let isDragging = false, dragMoved = false;
let prevX = 0, prevY = 0;
let velocityX = 0;

canvasWrap.addEventListener('pointerdown', (e) => {
  isDragging = true; dragMoved = false;
  prevX = e.clientX; prevY = e.clientY;
  canvasWrap.classList.add('dragging');
});
window.addEventListener('pointermove', (e) => {
  if (!isDragging) { handleHover(e); return; }
  const dx = e.clientX - prevX;
  const dy = e.clientY - prevY;
  if (Math.abs(dx) + Math.abs(dy) > 3) dragMoved = true;
  globeGroup.rotation.y += dx * 0.0052;
  globeGroup.rotation.x = Math.max(-1.1, Math.min(1.1, globeGroup.rotation.x + dy * 0.0052));
  velocityX = dx * 0.0052;
  prevX = e.clientX; prevY = e.clientY;
});
window.addEventListener('pointerup', (e) => {
  if (isDragging && !dragMoved) handleClick(e);
  isDragging = false;
  canvasWrap.classList.remove('dragging');
});

/* ============================================
   HOVER TOOLTIP
============================================ */
const raycaster = new THREE.Raycaster();
const pointerNDC = new THREE.Vector2();
let hoveredMarker = null;

function handleHover(e){
  pointerNDC.x = (e.clientX / width) * 2 - 1;
  pointerNDC.y = -(e.clientY / height) * 2 + 1;
  raycaster.setFromCamera(pointerNDC, camera);
  const hits = raycaster.intersectObjects(markers);

  if (hits.length){
    const m = hits[0].object;
    if (hoveredMarker !== m){
      if (hoveredMarker) hoveredMarker.scale.set(hoveredMarker.userData.baseScale, hoveredMarker.userData.baseScale, 1);
      hoveredMarker = m;
      ring.classList.add('hovering');
    }
    m.scale.set(0.26, 0.26, 1);
    tooltip.textContent = m.userData.country;
    tooltip.style.left = e.clientX + 'px';
    tooltip.style.top = e.clientY + 'px';
    tooltip.classList.add('visible');
    canvasWrap.style.cursor = 'pointer';
  } else {
    if (hoveredMarker){
      hoveredMarker.scale.set(hoveredMarker.userData.baseScale, hoveredMarker.userData.baseScale, 1);
      hoveredMarker = null;
      ring.classList.remove('hovering');
    }
    tooltip.classList.remove('visible');
    canvasWrap.style.cursor = 'grab';
  }
}

/* ============================================
   CLICK -> OPEN TRIP PANEL
============================================ */
function handleClick(e){
  pointerNDC.x = (e.clientX / width) * 2 - 1;
  pointerNDC.y = -(e.clientY / height) * 2 + 1;
  raycaster.setFromCamera(pointerNDC, camera);
  const hits = raycaster.intersectObjects(markers);
  if (hits.length) openPanel(hits[0].object.userData.country);
}

function openPanel(country){
  panelCountry.textContent = country;
  const trips = tripData[country] || [];

  cardList.innerHTML = '';
  if (!trips.length){
    cardList.innerHTML = `<p class="trip-panel-empty">No entries logged for ${country} yet — first trip's still ahead.</p>`;
  } else {
    trips.forEach(trip => {
      const a = document.createElement('a');
      a.className = 'trip-card';
      a.href = trip.link;
      a.setAttribute('data-hover', '');
      a.innerHTML = `
        <div class="trip-card-image"></div>
        <div class="trip-card-meta">
          <span class="trip-card-place">${trip.place}</span>
          <h3 class="trip-card-title">${trip.title}</h3>
          <span class="trip-card-link">view trip →</span>
        </div>
      `;
      cardList.appendChild(a);
    });
  }
  bindHoverTargets();
  panel.classList.add('open');
  hint.style.opacity = '0';
}

panelClose.addEventListener('click', closePanel);
function closePanel(){
  panel.classList.remove('open');
  hint.style.opacity = '1';
}
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });

/* ============================================
   RENDER LOOP
============================================ */
function animate(){
  requestAnimationFrame(animate);
  if (!isDragging){
    globeGroup.rotation.y += 0.0011 + velocityX * 0.02;
    velocityX *= 0.9;
  }
  renderer.render(scene, camera);
}
animate();