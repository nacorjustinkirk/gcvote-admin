import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEnvironmentComponent } from './delete-environment.component';

describe('DeleteEnvironmentComponent', () => {
  let component: DeleteEnvironmentComponent;
  let fixture: ComponentFixture<DeleteEnvironmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteEnvironmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
