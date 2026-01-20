import { computed, Injectable, signal } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
    private _auto = signal(true);
    private _mode = signal<ProgressBarMode >('indeterminate');
    private _progress = signal(0);
    private _show = signal(false);
    private _urlMap: Map<string, boolean> = new Map<string, boolean>();

    auto = computed(()=> this._auto());
    mode = computed(() => this._mode());
    progress = computed(() => this._progress());
    show = computed(() => this._show());


  setshow(): void {
    this._show.set(true);
  }

  hide(): void {
    this._show.set(false);
  }
  setAutoMode(value: boolean): void {
    this._auto.set(value);
  }

  setMode(value: ProgressBarMode): void {
    this._mode.set(value);
  }
  setProgress(value: number): void {
    if (value < 0 || value > 100) return;
    this._progress.set(value);
  }


  _setLoadingStatus(status: boolean, url: string): void {
        if ( !url ) return;

        if ( status === true )
        {
            this._urlMap.set(url, status);
            this._show.set(true);
        }
        else if ( status === false && this._urlMap.has(url) )
        {
            this._urlMap.delete(url);
        }

        if ( this._urlMap.size === 0 )
        {
            this._show.set(false);
        }
    }
  }
