class RayEmitter {
  constructor(x, y, d) {
    this.pos = createVector(x, y);
    this.rays = [];
    this.density = d;

    for (let a = 0; a < 360; a+=this.density) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  update(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }

  changeDensity(d){
    if (d > 0 && this.density > 0.03125){
      this.density /= 2;
    } else if (d < 0 && this.density < 128) {
      this.density *= 2;
    }
    
    this.rays = [];
    for (let a = 0; a < 360; a+=this.density) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
    
    console.log(this.density);
  }

  look(walls) {
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          const d = p5.Vector.dist(this.pos, pt);
          if (d < record) {
            record = d;
            closest = pt;
          }
          // stroke(255, 10); // draw shadow lines
          // line(this.pos.x, this.pos.y, pt.x, pt.y);
        }
      }
      if (closest) {
        stroke(255, 20);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }

  show() {
    fill(225);
    ellipse(this.pos.x, this.pos.y, 16);
    for (let ray of this.rays) {
      ray.show();
    }
  }
}