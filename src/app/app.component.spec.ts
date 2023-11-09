import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'autorama_frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('autorama_frontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('autorama_frontend app is running!');
  });
});


// Navbar
<nav class="navbar navbar-expand-lg fixed-top " style = "background-color: #e3f2fd;" >
  <div class="container-fluid" >
    <!-- '' inside the "" specifies the route '' that has been mentioned in app - routing.module.ts file-- >
      <a class="navbar-brand"[routerLink] = "''" > AutoRama < /a>
        < button class="navbar-toggler" type = "button" data - bs - toggle="collapse" data - bs - target="#navbarSupportedContent"
aria - controls="navbarSupportedContent" aria - expanded="false" aria - label="Toggle navigation" >
  <span class="navbar-toggler-icon" > </span>
    < /button>
    < div class="collapse navbar-collapse" id = "navbarSupportedContent" >
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" >
        <li class="nav-item" >
          <a class="nav-link active" aria - current="page"[routerLink] = "" > Home < /a>
            < /li>
            < li class="nav-item" >
              <a class="nav-link"[routerLink] = "" > About < /a>
                < /li>
                < li class="nav-item" >
                  <a class="nav-link active"[routerLink] = "" > Contact Us < /a>
                    < /li>
                    < li class="nav-item dropdown" >
                      <a class="nav-link dropdown-toggle" href = "#" role = "button" data - bs - toggle="dropdown" aria - expanded="false" >
                        Inventory
                        < /a>
                        < ul class="dropdown-menu" >
                          <li><a class="dropdown-item"[routerLink] = "['inventory', 'cars']" > Cars < /a></li >
                            <li><a class="dropdown-item"[routerLink] = "'/inventory/tires'" > Tires < /a></li >
                              <li><a class="dropdown-item"[routerLink] = "['/inventory', 'batteries']" > Batteries < /a></li >
                                <li>
                                <hr class="dropdown-divider" >
                                  </li>
                                  < li > <a class="dropdown-item"[routerLink] = "['inventory/accessories']" > Accessories < /a></li >
                                    </ul>
                                    < /li>
                                    < li class="nav-item" >
                                      <a class="nav-link disabled" > Disabled < /a>
                                        < /li>
                                        < /ul>
                                        < form class="d-flex" role = "search" >
                                          <input class="form-control me-2" type = "search" placeholder = "Search" aria - label="Search" >
                                            <button class="btn btn-outline-success" type = "submit" > Search < /button>
                                              < /form>
                                              < /div>
                                              < /div>
                                              < /nav>