import { Component } from '@angular/core';

@Component({
  selector: 'app-balloon',
  templateUrl: './balloon.component.html',
  styleUrls: ['./balloon.component.css']
})
export class BalloonComponent {

  private addWord: any;
  private loop: any;
  _hold: boolean;
  _active: any;
  _hiding: any;
  public height: number;
  public hidden = true;
  private WORD_SPEAK_TIME = 200;
  private CLOSE_BALLOON_DELAY = 5000;
  public contentText = '';

  public speak (completeCallback, text: string, hold: boolean) {
    this.hidden = false;
    this.show();
    this.height = this.calculateHeight(text);
    this.sayWords(completeCallback, text, hold);
  }
  private calculateHeight(text: string): number {
    const charCount: number = text.length;
    const lineCount: number = Math.round(charCount / 20) + 1;
    return lineCount * 20;
  }
  public show () {
    this.hidden = false;
  }
  public hide (fast) {
    if (fast) {
      this.hidden = true;
        return;
    }
    this._hiding = setTimeout(this.finishHideBalloon.bind(this), this.CLOSE_BALLOON_DELAY);
  }
  private sayWords (completeCallback, text, hold) {
    this._active = true;
    this._hold = hold;
    const words = text.split(/[^\S-]/);
    const time = this.WORD_SPEAK_TIME;
    let idx = 1;

    this.addWord = () => {
        if (!this._active) {
          return;
        }
        if (idx > words.length) {
            delete this.addWord;
            this._active = false;
            if (!this._hold) {
                this._hiding = setTimeout(this.finishHideBalloon.bind(this), this.CLOSE_BALLOON_DELAY);
                completeCallback();
            }
        } else {
            this.contentText = words.slice(0, idx).join(' ');
            idx++;
            this.loop = setTimeout(this.addWord.bind(this), time);
        }
    };
    this.addWord();
  }
  finishHideBalloon () {
      if (this._active) {
        return;
      }
      this.hidden = true;
      this._hiding = null;
  }
  public pause(): void {
    clearTimeout(this.loop);
    if (this._hiding) {
        clearTimeout(this._hiding);
        this._hiding = null;
    }
  }

  public resume (): void {
    if (this.addWord) {
        this.addWord();
    } else if (!this._hold && !this.hidden) {
        this._hiding = setTimeout(this.finishHideBalloon.bind(this), this.CLOSE_BALLOON_DELAY);
    }
  }
}
